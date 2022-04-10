import { RenderTexture, Resource, Texture } from '@pixi/core';
import { Matrix } from '@pixi/math';
import { NitroSprite } from '../../../../../core/utils/proxy/NitroSprite';
import { IGraphicAsset } from '../../../../../room/object/visualization/utils/IGraphicAsset';
import { TextureUtils } from '../../../../../room/utils/TextureUtils';
import { Nitro } from '../../../../Nitro';
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

            const existingAsset = this.getAsset(`${ this._imageUrl }_${ i }`);

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

            const x = asset.x;
            const y = asset.y;
            const flipH = asset.flipH;
            const flipV = asset.flipV;

            const renderTexture = RenderTexture.create({
                width: asset.width,
                height: asset.height
            });

            Nitro.instance.renderer.render(sprite, {
                renderTexture: renderTexture,
                clear: true,
                transform: matrix
            });

            const newTexture = TextureUtils.generateTexture(sprite);

            this.asset.disposeAsset(`${ this._imageUrl }_${ i }`);
            this.asset.addAsset(`${ this._imageUrl }_${ i }`, newTexture, true, x, y, flipH, flipV);
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

        sprite.transform.setFromMatrix(matrix);

        const x = asset.x;
        const y = asset.y;
        const flipH = asset.flipH;
        const flipV = asset.flipV;

        const newTexture = TextureUtils.generateTexture(sprite);

        this.asset.disposeAsset(`${ this._imageUrl }_0`);
        this.asset.addAsset(`${ this._imageUrl }_0`, newTexture, true, x, y, flipH, flipV);

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
                    this.generateTransformedImage(Nitro.instance.core.asset.getTexture(this._imageUrl), this.getAsset(super.getSpriteAssetName(scale, layerId)));
                }
            }

            return `${ this._imageUrl }_${ this.getFrameNumber(scale, layerId) }`;
        }

        return super.getSpriteAssetName(scale, layerId);
    }
}
