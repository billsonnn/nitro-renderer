import { IGraphicAsset } from '@nitrots/api';
import { GetAssetManager } from '@nitrots/assets';
import { TextureUtils } from '@nitrots/utils';
import { Matrix, Sprite, Texture } from 'pixi.js';
import { FurnitureBBVisualization } from './FurnitureBBVisualization';
import { FurnitureBrandedImageVisualization } from './FurnitureBrandedImageVisualization';

export class FurnitureIsometricBBVisualization extends FurnitureBBVisualization
{
    private _needsTransform: boolean = true;

    protected generateTransformedImage(texture: Texture, asset: IGraphicAsset): void
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

        const sprite = new Sprite(texture);
        const newTexture = TextureUtils.createAndWriteRenderTexture((asset.width + matrix.tx), (asset.height + matrix.ty), sprite, matrix);

        this.asset.disposeAsset(`${this._imageUrl}_0`);
        this.asset.addAsset(`${this._imageUrl}_0`, newTexture, true, sprite.x, sprite.y, asset.flipH, asset.flipV);

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
            if(this._needsTransform) this.generateTransformedImage(GetAssetManager().getTexture(this._imageUrl), this.getAsset(super.getSpriteAssetName(scale, layerId)));

            return `${this._imageUrl}_${this.getFrameNumber(scale, layerId)}`;
        }

        return super.getSpriteAssetName(scale, layerId);
    }
}
