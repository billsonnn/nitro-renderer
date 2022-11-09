import { RenderTexture, Resource, Texture } from '@pixi/core';
import { Matrix } from '@pixi/math';
import { GetAssetManager, IGraphicAsset } from '../../../../../api';
import { NitroSprite, PixiApplicationProxy } from '../../../../../pixi-proxy';
import { FurnitureBBVisualization } from './FurnitureBBVisualization';
import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization';

export class FurnitureIsometricBBVisualization extends FurnitureBBVisualization
{
    private _needsTransform: boolean = true;

    protected transformGifTextures(asset: IGraphicAsset): void
    {
        if(!this._gifCollection) return;

        const textures = this._gifCollection.textures;

        if(!textures.length) return;

        for(let i = 0; i < textures.length; i++)
        {
            const texture = textures[i];

            if(!texture) continue;

            const existingAsset = this.getAsset(`${this._imageUrl}_${i}`);

            if(!existingAsset) continue;

            const scale = 1.1;
            const matrix = new Matrix();
            const difference = (asset.width / texture.width);

            switch(this.direction)
            {
                case 2:
                    matrix.a = difference;
                    matrix.b = (-0.5 * difference);
                    matrix.c = 0;
                    matrix.d = (difference * scale);
                    matrix.tx = 0;
                    matrix.ty = ((0.5 * difference) * texture.width);
                    break;
                case 0:
                case 4:
                    matrix.a = difference;
                    matrix.b = (0.5 * difference);
                    matrix.c = 0;
                    matrix.d = (difference * scale);
                    matrix.tx = 0;
                    matrix.ty = 0;
                    break;
                default:
                    matrix.a = difference;
                    matrix.b = 0;
                    matrix.c = 0;
                    matrix.d = difference;
                    matrix.tx = 0;
                    matrix.ty = 0;
            }

            const sprite = new NitroSprite(texture);

            const renderTexture = RenderTexture.create({
                width: (asset.width + matrix.tx),
                height: (asset.height + matrix.ty)
            });

            PixiApplicationProxy.instance.renderer.render(sprite, {
                renderTexture,
                clear: true,
                transform: matrix
            });

            this.asset.disposeAsset(`${this._imageUrl}_${i}`);
            this.asset.addAsset(`${this._imageUrl}_${i}`, renderTexture, true, asset.x, asset.y, asset.flipH, asset.flipV);
        }

        this._needsTransform = false;
    }

    protected generateTransformedImage(texture: Texture<Resource>, asset: IGraphicAsset): void
    {
        const scale = 1.1;
        const matrix = new Matrix();
        const difference = (asset.width / texture.width);

        switch(this.direction)
        {
            case 2:
                matrix.a = difference;
                matrix.b = (-0.5 * difference);
                matrix.c = 0;
                matrix.d = (difference * scale);
                matrix.tx = 0;
                matrix.ty = ((0.5 * difference) * texture.width);
                break;
            case 0:
            case 4:
                matrix.a = difference;
                matrix.b = (0.5 * difference);
                matrix.c = 0;
                matrix.d = (difference * scale);
                matrix.tx = 0;
                matrix.ty = 0;
                break;
            default:
                matrix.a = difference;
                matrix.b = 0;
                matrix.c = 0;
                matrix.d = difference;
                matrix.tx = 0;
                matrix.ty = 0;
        }

        const sprite = new NitroSprite(texture);

        const renderTexture = RenderTexture.create({
            width: (asset.width + matrix.tx),
            height: (asset.height + matrix.ty)
        });

        PixiApplicationProxy.instance.renderer.render(sprite, {
            renderTexture,
            clear: true,
            transform: matrix
        });

        this.asset.disposeAsset(`${this._imageUrl}_0`);
        this.asset.addAsset(`${this._imageUrl}_0`, renderTexture, true, sprite.x, sprite.y, asset.flipH, asset.flipV);

        this._needsTransform = false;
    }

    protected checkAndCreateImageForCurrentState(): void
    {
        super.checkAndCreateImageForCurrentState();

        this._needsTransform = true;
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if((tag === FurnitureBrandedImageVisualization.BRANDED_IMAGE) && this._imageUrl)
        {
            if(this._needsTransform)
            {
                if(this._isAnimated)
                {
                    this.transformGifTextures(this.getAsset(super.getSpriteAssetName(scale, layerId)));
                }
                else
                {
                    this.generateTransformedImage(GetAssetManager().getTexture(this._imageUrl), this.getAsset(super.getSpriteAssetName(scale, layerId)));
                }
            }

            return `${this._imageUrl}_${this.getFrameNumber(scale, layerId)}`;
        }

        return super.getSpriteAssetName(scale, layerId);
    }
}
