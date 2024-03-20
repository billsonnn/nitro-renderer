import { AvatarSetType, IAssetManager, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IAvatarImageListener, IAvatarRenderManager, IFigureData, IFigurePartSet, IGraphicAsset, IStructureData } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { GetConfiguration } from '@nitrots/configuration';
import { GetEventDispatcher, NitroEventType } from '@nitrots/events';
import { AvatarAssetDownloadManager } from './AvatarAssetDownloadManager';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarImage } from './AvatarImage';
import { AvatarStructure } from './AvatarStructure';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { FigureDataContainer } from './FigureDataContainer';
import { PlaceHolderAvatarImage } from './PlaceHolderAvatarImage';
import { AssetAliasCollection } from './alias';
import { HabboAvatarAnimations } from './data/HabboAvatarAnimations';
import { HabboAvatarGeometry } from './data/HabboAvatarGeometry';
import { HabboAvatarPartSets } from './data/HabboAvatarPartSets';

export class AvatarRenderManager implements IAvatarRenderManager
{
    private static DEFAULT_FIGURE: string = 'hd-99999-99999';

    private _structure: AvatarStructure = new AvatarStructure(this);
    private _aliasCollection: AssetAliasCollection = new AssetAliasCollection(this, GetAssetManager());
    private _avatarAssetDownloadManager: AvatarAssetDownloadManager = new AvatarAssetDownloadManager(GetAssetManager(), this._structure);
    private _effectAssetDownloadManager: EffectAssetDownloadManager = new EffectAssetDownloadManager(GetAssetManager(), this._structure);

    private _placeHolderFigure: AvatarFigureContainer = new AvatarFigureContainer(AvatarRenderManager.DEFAULT_FIGURE);

    public async init(): Promise<void>
    {
        this._structure?.initGeometry(HabboAvatarGeometry.geometry);
        this._structure?.initPartSets(HabboAvatarPartSets.partSets);

        await this.loadActions();

        this._structure?.initAnimation(HabboAvatarAnimations.animations);
        await this.loadFigureData();

        this._aliasCollection.init();

        GetEventDispatcher().addEventListener(NitroEventType.AVATAR_ASSET_LOADED, () => this._aliasCollection.reset());
        GetEventDispatcher().addEventListener(NitroEventType.AVATAR_EFFECT_LOADED, () => this._aliasCollection.reset());

        await this._avatarAssetDownloadManager.init();
        await this._effectAssetDownloadManager.init();
    }

    private async loadActions(): Promise<void>
    {
        const defaultActions = GetConfiguration().getValue<string>('avatar.default.actions');

        if(defaultActions) this._structure.initActions(GetAssetManager(), defaultActions);

        const url = GetConfiguration().getValue<string>('avatar.actions.url');

        if(!url || !url.length) throw new Error('Invalid avatar action url');

        const response = await fetch(url);

        if(response.status !== 200) throw new Error('Invalid avatar action file');

        this._structure.updateActions(await response.json());
    }

    private async loadFigureData(): Promise<void>
    {
        const defaultFigureData = GetConfiguration().getValue<IFigureData>('avatar.default.figuredata');

        if(defaultFigureData) this._structure?.initFigureData(defaultFigureData);

        const url = GetConfiguration().getValue<string>('avatar.figuredata.url');

        if(!url || !url.length) throw new Error('Invalid figure data url');

        const response = await fetch(url);

        if(response.status !== 200) throw new Error('Invalid figure data file');

        this._structure.figureData.appendJSON(await response.json());

        this._structure.init();
    }

    public createFigureContainer(figure: string): IAvatarFigureContainer
    {
        return new AvatarFigureContainer(figure);
    }

    public isFigureContainerReady(container: IAvatarFigureContainer): boolean
    {
        if(!this._avatarAssetDownloadManager) return false;

        return this._avatarAssetDownloadManager.isAvatarFigureContainerReady(container);
    }

    public createAvatarImage(figure: string, size: string, gender: string, listener: IAvatarImageListener = null, effectListener: IAvatarEffectListener = null): IAvatarImage
    {
        if(!this._structure || !this._avatarAssetDownloadManager) return null;

        const figureContainer = new AvatarFigureContainer(figure);

        if(gender) this.validateAvatarFigure(figureContainer, gender);

        if(this._avatarAssetDownloadManager.isAvatarFigureContainerReady(figureContainer))
        {
            return new AvatarImage(this._structure, this._aliasCollection, figureContainer, size, this._effectAssetDownloadManager, effectListener);
        }

        this._avatarAssetDownloadManager.downloadAvatarFigure(figureContainer, listener);

        return new PlaceHolderAvatarImage(this._structure, this._aliasCollection, this._placeHolderFigure, size, this._effectAssetDownloadManager);
    }

    public downloadAvatarFigure(container: IAvatarFigureContainer, listener: IAvatarImageListener): void
    {
        if(!this._avatarAssetDownloadManager) return;

        this._avatarAssetDownloadManager.downloadAvatarFigure(container, listener);
    }

    private validateAvatarFigure(container: AvatarFigureContainer, gender: string): boolean
    {
        let isValid = false;

        const typeIds = this._structure.getMandatorySetTypeIds(gender, 2);

        if(typeIds)
        {
            const figureData = this._structure.figureData;

            for(const id of typeIds)
            {
                if(!container.hasPartType(id))
                {
                    const figurePartSet = this._structure.getDefaultPartSet(id, gender);

                    if(figurePartSet)
                    {
                        container.updatePart(id, figurePartSet.id, [0]);

                        isValid = true;
                    }
                }
                else
                {
                    const setType = figureData.getSetType(id);

                    if(setType)
                    {
                        const figurePartSet = setType.getPartSet(container.getPartSetId(id));

                        if(!figurePartSet)
                        {
                            const partSet = this._structure.getDefaultPartSet(id, gender);

                            if(partSet)
                            {
                                container.updatePart(id, partSet.id, [0]);

                                isValid = true;
                            }
                        }
                    }
                }
            }
        }

        return !(isValid);
    }

    public getFigureClubLevel(container: IAvatarFigureContainer, gender: string, searchParts: string[] = null): number
    {
        if(!this._structure) return 0;

        const figureData = this._structure.figureData;
        const parts = Array.from(container.getPartTypeIds());

        let clubLevel = 0;

        for(const part of parts)
        {
            const set = figureData.getSetType(part);

            if(!set) continue;

            const setId = container.getPartSetId(part);
            const partSet = set.getPartSet(setId);

            if(partSet)
            {
                clubLevel = Math.max(partSet.clubLevel, clubLevel);

                const palette = figureData.getPalette(set.paletteID);
                const colors = container.getPartColorIds(part);

                for(const colorId of colors)
                {
                    const color = palette.getColor(colorId);

                    if(!color) continue;

                    clubLevel = Math.max(color.clubLevel, clubLevel);
                }
            }
        }

        if(!searchParts) searchParts = this._structure.getBodyPartsUnordered(AvatarSetType.FULL);

        for(const part of searchParts)
        {
            const set = figureData.getSetType(part);

            if(!set) continue;

            if(parts.indexOf(part) === -1) clubLevel = Math.max(set.optionalFromClubLevel(gender), clubLevel);
        }

        return clubLevel;
    }

    public isValidFigureSetForGender(setId: number, gender: string): boolean
    {
        const structure = this.structureData;
        const partSet = structure.getFigurePartSet(setId);

        return !!(partSet && ((partSet.gender.toUpperCase() === 'U') || (partSet.gender.toUpperCase() === gender.toUpperCase())));
    }

    public getFigureStringWithFigureIds(figure: string, gender: string, _arg_3: number[]): string
    {
        const container = new FigureDataContainer();

        container.loadAvatarData(figure, gender);

        const partSets: IFigurePartSet[] = this.resolveFigureSets(_arg_3);

        for(const partSet of partSets)
        {
            container.savePartData(partSet.type, partSet.id, container.getColourIds(partSet.type));
        }

        return container.getFigureString();
    }

    private resolveFigureSets(setIds: number[]): IFigurePartSet[]
    {
        const structure = this.structureData;
        const partSets: IFigurePartSet[] = [];

        for(const setId of setIds)
        {
            const partSet = structure.getFigurePartSet(setId);

            if(partSet) partSets.push(partSet);
        }

        return partSets;
    }

    public getMandatoryAvatarPartSetIds(k: string, _arg_2: number): string[]
    {
        if(!this._structure) return null;

        return this._structure.getMandatorySetTypeIds(k, _arg_2);
    }

    public getAssetByName(name: string): IGraphicAsset
    {
        return this._aliasCollection.getAsset(name);
    }

    public get assets(): IAssetManager
    {
        return GetAssetManager();
    }

    public get structure(): AvatarStructure
    {
        return this._structure;
    }

    public get structureData(): IStructureData
    {
        if(this._structure) return this._structure.figureData;

        return null;
    }

    public get downloadManager(): AvatarAssetDownloadManager
    {
        return this._avatarAssetDownloadManager;
    }
}
