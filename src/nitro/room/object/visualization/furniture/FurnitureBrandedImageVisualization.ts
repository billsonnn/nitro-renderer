import { Resource, Texture } from '@pixi/core';
import { GetAssetManager, GraphicAssetGifCollection, RoomObjectVariable } from '../../../../../api';
import { Nitro } from '../../../../Nitro';
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
    protected _isAnimated: boolean;
    protected _gifCollection: GraphicAssetGifCollection;

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
        this._isAnimated = false;
        this._gifCollection = null;

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
            this._isAnimated = (this.object.model.getValue<boolean>(RoomObjectVariable.FURNITURE_BRANDING_IS_ANIMATED) || false);
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

        if(this._gifCollection)
        {
            //
        }

        (this.asset && this.asset.disposeAsset(this._imageUrl));

        // dispose all

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

            if(this._isAnimated)
            {
                const gifCollection = Nitro.instance.roomEngine.roomContentLoader.getGifCollection(imageUrl);

                if(gifCollection)
                {
                    this._gifCollection = gifCollection;

                    texture = gifCollection.textures[0];
                }
            }
            else
            {
                texture = GetAssetManager().getTexture(imageUrl);
            }

            if(!texture) return false;

            this.imageReady(texture, imageUrl);

            return true;
        }

        return false;
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

    protected checkAndCreateImageForCurrentState(): void
    {
        if(this._isAnimated)
        {
            this.buildAssetsForGif();

            return;
        }

        if(!this._imageUrl) return;

        const texture = GetAssetManager().getTexture(this._imageUrl);

        if(!texture) return;

        const state = this.object.getState(0);

        this.addBackgroundAsset(texture, state, 0);
    }

    protected buildAssetsForGif(): void
    {
        if(!this._gifCollection) return;

        const textures = this._gifCollection.textures;
        const durations = this._gifCollection.durations;

        if(!textures.length || !durations.length || (textures.length !== durations.length)) return;

        const state = this.object.getState(0);

        for(let i = 0; i < textures.length; i++)
        {
            const texture = textures[i];
            const duration = durations[i];

            if(!texture) continue;

            this.addBackgroundAsset(texture, state, i);
        }

        this._currentFrame = -1;
        this._totalFrames = textures.length;
    }

    protected addBackgroundAsset(texture: Texture<Resource>, state: number, frame: number): void
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

    protected updateAnimation(scale: number): number
    {
        if(!this._imageReady || !this._isAnimated || (this._totalFrames <= 0)) return 0;

        return 1;
    }

    protected getFrameNumber(scale: number, layerId: number): number
    {
        if(!this._imageReady || !this._isAnimated || (this._totalFrames <= 0)) return 0;

        const tag = this.getLayerTag(scale, this._direction, layerId);

        if((tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE) && this._imageUrl)
        {
            let newFrame = this._currentFrame;

            if(newFrame < 0)
            {
                newFrame = 0;
            }
            else
            {
                newFrame += 1;
            }

            if(newFrame === this._totalFrames) newFrame = 0;

            this._currentFrame = newFrame;

            return this._currentFrame;
        }

        return 0;
    }
}
