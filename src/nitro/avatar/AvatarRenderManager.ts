import { AvatarSetType, GetAssetManager, IAssetManager, IAvatarEffectListener, IAvatarFigureContainer, IAvatarImage, IAvatarImageListener, IAvatarRenderManager, IFigureData, IFigurePartSet, IFigureSetData, IGraphicAsset, INitroEvent, IStructureData, NitroConfiguration, NitroLogger } from '../../api';
import { NitroManager } from '../../core';
import { AvatarRenderEvent, NitroEvent } from '../../events';
import { FigureDataContainer } from '../utils';
import { AssetAliasCollection } from './alias';
import { AvatarAssetDownloadManager } from './AvatarAssetDownloadManager';
import { AvatarFigureContainer } from './AvatarFigureContainer';
import { AvatarImage } from './AvatarImage';
import { AvatarStructure } from './AvatarStructure';
import { HabboAvatarAnimations } from './data/HabboAvatarAnimations';
import { HabboAvatarGeometry } from './data/HabboAvatarGeometry';
import { HabboAvatarPartSets } from './data/HabboAvatarPartSets';
import { EffectAssetDownloadManager } from './EffectAssetDownloadManager';
import { PlaceHolderAvatarImage } from './PlaceHolderAvatarImage';
import { AvatarStructureDownload } from './structure';

export class AvatarRenderManager extends NitroManager implements IAvatarRenderManager
{
    private static DEFAULT_FIGURE: string = 'hd-99999-99999';

    private _aliasCollection: AssetAliasCollection;

    private _structure: AvatarStructure;
    private _avatarAssetDownloadManager: AvatarAssetDownloadManager;
    private _effectAssetDownloadManager: EffectAssetDownloadManager;

    private _placeHolderFigure: AvatarFigureContainer;

    private _figureMapReady: boolean;
    private _effectMapReady: boolean;
    private _actionsReady: boolean;
    private _structureReady: boolean;
    private _geometryReady: boolean;
    private _partSetsReady: boolean;
    private _animationsReady: boolean;
    private _isReady: boolean;

    constructor()
    {
        super();

        this._structure = null;
        this._avatarAssetDownloadManager = null;

        this._placeHolderFigure = null;

        this._figureMapReady = false;
        this._effectMapReady = false;
        this._actionsReady = false;
        this._geometryReady = false;
        this._partSetsReady = false;
        this._animationsReady = false;
        this._isReady = false;

        this.onAvatarAssetDownloaderReady = this.onAvatarAssetDownloaderReady.bind(this);
        this.onAvatarAssetDownloaded = this.onAvatarAssetDownloaded.bind(this);
        this.onEffectAssetDownloaderReady = this.onEffectAssetDownloaderReady.bind(this);
        this.onEffectAssetDownloaded = this.onEffectAssetDownloaded.bind(this);
        this.onAvatarStructureDownloadDone = this.onAvatarStructureDownloadDone.bind(this);
    }

    public onInit(): void
    {
        this._structure = new AvatarStructure(this);

        this.loadGeometry();
        this.loadPartSets();
        this.loadActions();
        this.loadAnimations();
        this.loadFigureData();

        this._aliasCollection = new AssetAliasCollection(this, GetAssetManager());

        this._aliasCollection.init();

        if(!this._avatarAssetDownloadManager)
        {
            this._avatarAssetDownloadManager = new AvatarAssetDownloadManager(GetAssetManager(), this._structure);

            this._avatarAssetDownloadManager.addEventListener(AvatarAssetDownloadManager.DOWNLOADER_READY, this.onAvatarAssetDownloaderReady);
            this._avatarAssetDownloadManager.addEventListener(AvatarAssetDownloadManager.LIBRARY_LOADED, this.onAvatarAssetDownloaded);
        }

        if(!this._effectAssetDownloadManager)
        {
            this._effectAssetDownloadManager = new EffectAssetDownloadManager(GetAssetManager(), this._structure);

            this._effectAssetDownloadManager.addEventListener(EffectAssetDownloadManager.DOWNLOADER_READY, this.onEffectAssetDownloaderReady);
            this._effectAssetDownloadManager.addEventListener(EffectAssetDownloadManager.LIBRARY_LOADED, this.onEffectAssetDownloaded);
        }

        this.checkReady();
    }

    public onDispose(): void
    {
        if(this._avatarAssetDownloadManager)
        {
            this._avatarAssetDownloadManager.removeEventListener(AvatarAssetDownloadManager.DOWNLOADER_READY, this.onAvatarAssetDownloaderReady);

            this._avatarAssetDownloadManager.removeEventListener(AvatarAssetDownloadManager.LIBRARY_LOADED, this.onAvatarAssetDownloaded);
        }

        if(this._effectAssetDownloadManager)
        {
            this._effectAssetDownloadManager.removeEventListener(EffectAssetDownloadManager.DOWNLOADER_READY, this.onEffectAssetDownloaderReady);

            this._effectAssetDownloadManager.removeEventListener(EffectAssetDownloadManager.LIBRARY_LOADED, this.onEffectAssetDownloaded);
        }
    }

    private loadGeometry(): void
    {
        if(!this._structure) return;

        this._structure.initGeometry(HabboAvatarGeometry.geometry);

        this._geometryReady = true;

        this.checkReady();
    }

    private loadPartSets(): void
    {
        if(!this._structure) return;

        this._structure.initPartSets(HabboAvatarPartSets.partSets);

        this._partSetsReady = true;

        this.checkReady();
    }

    private loadActions(): void
    {
        const defaultActions = NitroConfiguration.getValue<string>('avatar.default.actions');

        if(defaultActions) this._structure.initActions(GetAssetManager(), defaultActions);

        const request = new XMLHttpRequest();

        try
        {
            request.open('GET', NitroConfiguration.getValue<string>('avatar.actions.url'));

            request.send();

            request.onloadend = e =>
            {
                if(!this._structure) return;

                this._structure.updateActions(JSON.parse(request.responseText));

                this._actionsReady = true;

                this.checkReady();
            };

            request.onerror = e =>
            {
                throw new Error('invalid_avatar_actions');
            };
        }

        catch (e)
        {
            NitroLogger.error(e);
        }
    }

    private loadAnimations(): void
    {
        if(!this._structure) return;

        this._structure.initAnimation(HabboAvatarAnimations.animations);

        this._animationsReady = true;

        this.checkReady();
    }

    private loadFigureData(): void
    {
        const defaultFigureData = NitroConfiguration.getValue<IFigureData>('avatar.default.figuredata');

        if(!defaultFigureData || (typeof defaultFigureData === 'string'))
        {
            NitroLogger.error('XML figuredata is no longer supported');

            return;
        }

        if(this._structure) this._structure.initFigureData(defaultFigureData);

        const structureDownloader = new AvatarStructureDownload(NitroConfiguration.getValue<string>('avatar.figuredata.url'), (this._structure.figureData as IFigureSetData));

        structureDownloader.addEventListener(AvatarStructureDownload.AVATAR_STRUCTURE_DONE, this.onAvatarStructureDownloadDone);
    }

    private onAvatarStructureDownloadDone(event: INitroEvent): void
    {
        this._structureReady = true;

        this._structure.init();

        this.checkReady();
    }

    private onAvatarAssetDownloaderReady(event: INitroEvent): void
    {
        if(!event) return;

        this._figureMapReady = true;

        this.checkReady();
    }

    private onAvatarAssetDownloaded(event: INitroEvent): void
    {
        if(!event) return;

        this._aliasCollection.reset();
    }

    private onEffectAssetDownloaderReady(event: INitroEvent): void
    {
        if(!event) return;

        this._effectMapReady = true;

        this.checkReady();
    }

    private onEffectAssetDownloaded(event: INitroEvent): void
    {
        if(!event) return;

        this._aliasCollection.reset();
    }

    private checkReady(): void
    {
        if(this._isReady) return;

        if(!this._geometryReady || !this._partSetsReady || !this._actionsReady || !this._animationsReady || !this._figureMapReady || !this._effectMapReady || !this._structureReady) return;

        this._isReady = true;

        if(this.events) this.events.dispatchEvent(new NitroEvent(AvatarRenderEvent.AVATAR_RENDER_READY));
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

        if(!this._placeHolderFigure) this._placeHolderFigure = new AvatarFigureContainer(AvatarRenderManager.DEFAULT_FIGURE);

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

    public get isReady(): boolean
    {
        return this._isReady;
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
