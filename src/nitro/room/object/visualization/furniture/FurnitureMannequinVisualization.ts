import { AvatarSetType, IAvatarImageListener, IObjectVisualizationData, RoomObjectVariable } from '../../../../../api';
import { FurnitureMannequinVisualizationData } from './FurnitureMannequinVisualizationData';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureMannequinVisualization extends FurnitureVisualization implements IAvatarImageListener
{
    private static AVATAR_IMAGE_SPRITE_TAG: string = 'avatar_image';

    private _mannequinScale: number;
    private _figure: string;
    private _gender: string;
    private _dynamicAssetName: string;
    private _needsUpdate: boolean;

    private _placeHolderFigure: string;

    private _disposed: boolean;

    constructor()
    {
        super();

        this._mannequinScale = -1;
        this._figure = null;
        this._gender = null;
        this._dynamicAssetName = null;
        this._needsUpdate = false;

        this._placeHolderFigure = 'hd-99999-99998';

        this._disposed = false;
    }

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof FurnitureMannequinVisualizationData)) return false;

        return super.initialize(data);
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._disposed = true;

        if(this._dynamicAssetName && this.asset)
        {
            this.asset.disposeAsset(this._dynamicAssetName);

            this._dynamicAssetName = null;
        }

        super.dispose();
    }

    protected updateObject(scale: number, direction: number): boolean
    {
        const updateObject = super.updateObject(scale, direction);

        if(updateObject)
        {
            if(this._mannequinScale !== scale)
            {
                this._mannequinScale = scale;

                this.updateAvatar();
            }
        }

        return updateObject;
    }

    protected updateModel(scale: number): boolean
    {
        let updateModel = super.updateModel(scale);

        if(updateModel)
        {
            const figure = (this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_FIGURE) || null);

            if(figure)
            {
                this._figure = (figure + '.' + this._placeHolderFigure);
                this._gender = (this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_GENDER) || null);

                this.updateAvatar();
            }
        }

        updateModel = (updateModel || this._needsUpdate);

        this._needsUpdate = false;

        return updateModel;
    }

    private updateAvatar(forceUpdate: boolean = false): void
    {
        if(!this.avatarExists() || forceUpdate)
        {
            const avatarImage = this.data.createAvatarImage(this._figure, this._mannequinScale, this._gender, this);

            if(avatarImage)
            {
                avatarImage.setDirection(AvatarSetType.FULL, this.direction);

                if(this._dynamicAssetName) this.asset.disposeAsset(this._dynamicAssetName);

                this.asset.addAsset(this.getAvatarAssetName(), avatarImage.getImage(AvatarSetType.FULL, false, 1, false), true);

                this._dynamicAssetName = this.getAvatarAssetName();
                this._needsUpdate = true;

                avatarImage.dispose();
            }
        }
    }

    private avatarExists(): boolean
    {
        return (this._figure && (this.getAsset(this.getAvatarAssetName()) !== null));
    }

    private getAvatarAssetName(): string
    {
        return (((((('mannequin_' + this._figure) + '_') + this._mannequinScale) + '_') + this.direction) + '_') + this.object.id;
    }

    public resetFigure(figure: string): void
    {
        if(figure === this._figure) this.updateAvatar(true);
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this.direction, layerId);

        if(this._figure && (tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this.avatarExists())
        {
            return this.getAvatarAssetName();
        }

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        const tag = this.getLayerTag(scale, direction, layerId);

        if((tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this.avatarExists()) return (-(this.getSprite(layerId).width) / 2);

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        const tag = this.getLayerTag(scale, direction, layerId);

        if((tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this.avatarExists()) return -(this.getSprite(layerId).height);

        return super.getLayerYOffset(scale, direction, layerId);
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    protected get data(): FurnitureMannequinVisualizationData
    {
        return this._data as FurnitureMannequinVisualizationData;
    }
}
