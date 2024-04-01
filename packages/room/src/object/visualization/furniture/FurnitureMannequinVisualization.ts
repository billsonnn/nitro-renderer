import { AvatarSetType, IAvatarImage, IAvatarImageListener, IGraphicAsset, IObjectVisualizationData, RoomObjectVariable } from '@nitrots/api';
import { Texture } from 'pixi.js';
import { FurnitureMannequinVisualizationData } from './FurnitureMannequinVisualizationData';
import { FurnitureVisualization } from './FurnitureVisualization';
export class FurnitureMannequinVisualization extends FurnitureVisualization implements IAvatarImageListener
{
    private static AVATAR_IMAGE_SPRITE_TAG: string = 'avatar_image';

    private _mannequinScale: number = -1;
    private _figure: string = null;
    private _gender: string = null;
    private _avatarImage: IAvatarImage = null;
    private _avatarWidth: number = 90;
    private _avatarHeight: number = 130;
    private _needsUpdate: boolean = false;
    private _placeHolderFigure: string = 'hd-99999-99998';
    private _disposed: boolean = false;

    public initialize(data: IObjectVisualizationData): boolean
    {
        if(!(data instanceof FurnitureMannequinVisualizationData)) return false;

        return super.initialize(data);
    }

    public dispose(): void
    {
        if(this._disposed) return;

        this._disposed = true;

        if(this._avatarImage)
        {
            this._avatarImage.dispose();

            this._avatarImage = null;
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
                this._figure = `${ figure }.${ this._placeHolderFigure }`;
                this._gender = (this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_MANNEQUIN_GENDER) || null);

                this.updateAvatar();
            }
        }

        updateModel = (updateModel || this._needsUpdate);

        this._needsUpdate = false;

        return updateModel;
    }

    private updateAvatar(): void
    {
        if(this._avatarImage)
        {
            this._avatarImage.dispose();

            this._avatarImage = null;
        }

        this._avatarImage = this.data.createAvatarImage(this._figure, this._mannequinScale, this._gender, this);
    }

    public resetFigure(figure: string): void
    {
        this.updateAvatar();

        this._needsUpdate = true;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        const tag = this.getLayerTag(scale, direction, layerId);

        if((tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this._avatarImage) return (-(this._avatarWidth) / 3);

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        const tag = this.getLayerTag(scale, direction, layerId);

        if((tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this._avatarImage) return (-(this._avatarHeight) / 3);

        return super.getLayerYOffset(scale, direction, layerId);
    }

    public getTexture(scale: number, layerId: number, asset: IGraphicAsset): Texture
    {
        const tag = this.getLayerTag(scale, this.direction, layerId);

        if((tag === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG) && this._avatarImage)
        {
            this._avatarImage.setDirection(AvatarSetType.FULL, this.direction);

            return this._avatarImage.processAsTexture(AvatarSetType.FULL, false);
        }

        return super.getTexture(scale, layerId, asset);
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
