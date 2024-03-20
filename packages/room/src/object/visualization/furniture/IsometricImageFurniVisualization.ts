import { IGraphicAsset } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Matrix, Sprite, Texture } from 'pixi.js';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class IsometricImageFurniVisualization extends FurnitureAnimatedVisualization
{
    protected static THUMBNAIL: string = 'THUMBNAIL';

    private _thumbnailAssetNameNormal: string;
    private _thumbnailImageNormal: Texture;
    private _thumbnailDirection: number;
    private _thumbnailChanged: boolean;
    protected _hasOutline: boolean;

    constructor()
    {
        super();

        this._thumbnailAssetNameNormal = null;
        this._thumbnailImageNormal = null;
        this._thumbnailDirection = -1;
        this._thumbnailChanged = false;
        this._hasOutline = false;
    }

    public get hasThumbnailImage(): boolean
    {
        return !(this._thumbnailImageNormal == null);
    }

    public setThumbnailImages(k: Texture): void
    {
        this._thumbnailImageNormal = k;
        this._thumbnailChanged = true;
    }

    protected updateModel(scale: number): boolean
    {
        const flag = super.updateModel(scale);

        if(!this._thumbnailChanged && (this._thumbnailDirection === this.direction)) return flag;

        this.refreshThumbnail();

        return true;
    }

    private refreshThumbnail(): void
    {
        if(this.asset == null) return;

        if(this._thumbnailImageNormal)
        {
            this.addThumbnailAsset(this._thumbnailImageNormal, 64);
        }
        else
        {
            this.asset.disposeAsset(this.getThumbnailAssetName(64));
        }

        this._thumbnailChanged = false;
        this._thumbnailDirection = this.direction;
    }

    private addThumbnailAsset(k: Texture, scale: number): void
    {
        let layerId = 0;

        while(layerId < this.totalSprites)
        {
            if(this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL)
            {
                const assetName = (this.cacheSpriteAssetName(scale, layerId, false) + this.getFrameNumber(scale, layerId));
                const asset = this.getAsset(assetName, layerId);

                if(asset)
                {
                    const _local_6 = this.generateTransformedThumbnail(k, asset);
                    const _local_7 = this.getThumbnailAssetName(scale);

                    this.asset.disposeAsset(_local_7);
                    this.asset.addAsset(_local_7, _local_6, true, asset.offsetX, asset.offsetY, false, false);
                }

                return;
            }

            layerId++;
        }
    }

    protected generateTransformedThumbnail(texture: Texture, asset: IGraphicAsset): Texture
    {
        if(this._hasOutline)
        {
            const container = new Sprite();
            const background = new Sprite(Texture.WHITE);

            background.tint = 0x000000;
            background.width = (texture.width + 40);
            background.height = (texture.height + 40);

            const sprite = new Sprite(texture);
            const offsetX = ((background.width - sprite.width) / 2);
            const offsetY = ((background.height - sprite.height) / 2);

            sprite.position.set(offsetX, offsetY);

            container.addChild(background, sprite);

            texture = TextureUtils.generateTexture(container);
        }

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

        sprite.setFromMatrix(matrix);

        return TextureUtils.generateTexture(sprite);
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        if(this._thumbnailImageNormal && (this.getLayerTag(scale, this.direction, layerId) === IsometricImageFurniVisualization.THUMBNAIL)) return this.getThumbnailAssetName(scale);

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getThumbnailAssetName(scale: number): string
    {
        this._thumbnailAssetNameNormal = this.getFullThumbnailAssetName(this.object.id, 64);

        return this._thumbnailAssetNameNormal;
    }

    protected getFullThumbnailAssetName(k: number, _arg_2: number): string
    {
        return [this._type, k, 'thumb', _arg_2].join('_');
    }
}
