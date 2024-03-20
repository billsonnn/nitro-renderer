import { RoomObjectVariable } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { Texture } from 'pixi.js';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureBrandedImageVisualization extends FurnitureVisualization
{
    protected static BRANDED_IMAGE: string = 'branded_image';
    protected static STATE_0: number = 0;
    protected static STATE_1: number = 1;
    protected static STATE_2: number = 2;
    protected static STATE_3: number = 3;

    protected _imageUrl: string;
    protected _shortUrl: string;
    protected _imageReady: boolean;

    protected _offsetX: number;
    protected _offsetY: number;
    protected _offsetZ: number;
    protected _currentFrame: number;
    protected _totalFrames: number;

    constructor()
    {
        super();

        this._imageUrl = null;
        this._shortUrl = null;
        this._imageReady = false;

        this._offsetX = 0;
        this._offsetY = 0;
        this._offsetZ = 0;
        this._currentFrame = -1;
        this._totalFrames = -1;
    }

    public dispose(): void
    {
        super.dispose();

        if(this._imageUrl)
        {
            (this.asset && this.asset.disposeAsset(this._imageUrl));
            // dispose all
        }
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
            this._offsetX = (this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_X) || 0);
            this._offsetY = (this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Y) || 0);
            this._offsetZ = (this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BRANDING_OFFSET_Z) || 0);
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
                this._imageReady = false;
                this._imageUrl = null;

                return true;
            }
        }

        return flag;
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
            let texture: Texture = null;

            texture = GetAssetManager().getTexture(imageUrl);

            if(!texture) return false;

            this.imageReady(texture, imageUrl);

            return true;
        }

        return false;
    }

    protected imageReady(texture: Texture, imageUrl: string): void
    {
        if(!texture)
        {
            this._imageUrl = null;

            return;
        }

        this._imageUrl = imageUrl;
    }

    protected checkAndCreateImageForCurrentState(): void
    {
        if(!this._imageUrl) return;

        const texture = GetAssetManager().getTexture(this._imageUrl);

        if(!texture) return;

        const state = this.object.getState(0);

        this.addBackgroundAsset(texture, state, 0);
    }

    protected addBackgroundAsset(texture: Texture, state: number, frame: number): void
    {
        let x = 0;
        let y = 0;
        let flipH = false;
        let flipV = false;

        switch(state)
        {
            case FurnitureBrandedImageVisualization.STATE_0:
                x = 0;
                y = 0;
                flipH = false;
                flipV = false;
                break;
            case FurnitureBrandedImageVisualization.STATE_1:
                x = -(texture.width);
                y = 0;
                flipH = true;
                flipV = false;
                break;
            case FurnitureBrandedImageVisualization.STATE_2:
                x = -(texture.width);
                y = -(texture.height);
                flipH = true;
                flipV = true;
                break;
            case FurnitureBrandedImageVisualization.STATE_3:
                x = 0;
                y = -(texture.height);
                flipH = false;
                flipV = true;
                break;
        }

        this.asset.addAsset(`${this._imageUrl}_${frame}`, texture, true, x, y, flipH, flipV);
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if((tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE) && this._imageUrl)
        {
            return `${this._imageUrl}_${this.getFrameNumber(scale, layerId)}`;
        }

        return super.getSpriteAssetName(scale, layerId);
    }
}
