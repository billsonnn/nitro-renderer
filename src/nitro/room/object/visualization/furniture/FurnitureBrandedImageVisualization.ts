import { Resource, Texture } from 'pixi.js';
import { Nitro } from '../../../../Nitro';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureBrandedImageVisualization extends FurnitureVisualization
{
    private static BRANDED_IMAGE: string = 'branded_image';

    protected _imageUrl: string;
    protected _shortUrl: string;
    protected _imageReady: boolean;

    protected _offsetX: number;
    protected _offsetY: number;
    protected _offsetZ: number;

    constructor()
    {
        super();

        this._imageUrl      = null;
        this._shortUrl      = null;
        this._imageReady    = false;

        this._offsetX       = 0;
        this._offsetY       = 0;
        this._offsetZ       = 0;
    }

    public dispose(): void
    {
        super.dispose();

        if(this._imageUrl) (this.asset && this.asset.disposeAsset(this._imageUrl));
    }

    protected updateObject(scale: number, direction: number): boolean
    {
        if(!super.updateObject(scale, direction)) return false;

        if(this._imageReady) this.checkAndCreateImageForCurrentState();

        return true;
    }

    protected updateModel(scale: number): boolean
    {
        const flag = super.updateModel(scale);

        if(flag)
        {
            this._offsetX   = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_X);
            this._offsetY   = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Y);
            this._offsetZ   = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Z);
        }

        if(!this._imageReady)
        {
            this._imageReady = this.checkIfImageReady();

            if(this._imageReady)
            {
                this.checkAndCreateImageForCurrentState();

                return true;
            }
        }
        else
        {
            if(this.checkIfImageChanged())
            {
                this._imageReady    = false;
                this._imageUrl      = null;

                return true;
            }
        }

        return flag;
    }

    protected imageReady(texture: Texture<Resource>, imageUrl: string): void
    {
        if(!texture)
        {
            this._imageUrl = null;

            return;
        }

        this._imageUrl = imageUrl;
    }

    private checkIfImageChanged(): boolean
    {
        const imageUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);

        if(imageUrl && (imageUrl === this._imageUrl)) return false;

        (this.asset && this.asset.disposeAsset(this._imageUrl));

        return true;
    }

    protected checkIfImageReady(): boolean
    {
        const model = this.object && this.object.model;

        if(!model) return false;

        const imageUrl = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_URL);

        if(!imageUrl) return false;

        if(this._imageUrl && (this._imageUrl === imageUrl)) return false;

        const imageStatus = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_IMAGE_STATUS);

        if(imageStatus === 1)
        {
            const texture   = Nitro.instance.core.asset.getTexture(imageUrl);

            if(!texture) return false;

            this.imageReady(texture, imageUrl);

            return true;
        }

        return false;
    }

    protected checkAndCreateImageForCurrentState(): void
    {
        if(!this._imageUrl) return;

        const texture   = Nitro.instance.core.asset.getTexture(this._imageUrl);

        if(!texture) return;

        this.asset.addAsset(this._imageUrl, texture, true, 0, 0, false, false);
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if((tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE) && this._imageUrl) return this._imageUrl;

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getLayerIgnoreMouse(scale: number, direction: number, layerId: number): boolean
    {
        const tag = this.getLayerTag(scale, direction, layerId);

        if(tag !== FurnitureBrandedImageVisualization.BRANDED_IMAGE) return super.getLayerIgnoreMouse(scale, direction, layerId);

        return true;
    }
}
