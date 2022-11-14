import { Resource, Texture } from '@pixi/core';
import { Matrix } from '@pixi/math';
import { IGraphicAsset, IRoomObjectSprite, RoomObjectVariable } from '../../../../../api';
import { NitroSprite, TextureUtils } from '../../../../../pixi-proxy';
import { IsometricImageFurniVisualization } from './IsometricImageFurniVisualization';

export class FurnitureGuildIsometricBadgeVisualization extends IsometricImageFurniVisualization
{
    public static PRIMARY_COLOUR_SPRITE_TAG: string = 'COLOR1';
    public static SECONDARY_COLOUR_SPRITE_TAG: string = 'COLOR2';
    public static DEFAULT_COLOR_1: number = 0xEEEEEE;
    public static DEFAULT_COLOR_2: number = 0x4B4B4B;

    private _color1: number;
    private _color2: number;

    protected updateModel(scale: number): boolean
    {
        const flag = super.updateModel(scale);

        if(!this.hasThumbnailImage)
        {
            const assetName = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_ASSET_NAME);

            if(assetName && assetName.length) this.setThumbnailImages(this.getBitmapAsset(assetName));
        }

        const color1 = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_1);

        this._color1 = color1 ? color1 : FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_1;

        const color2 = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_2);

        this._color2 = color2 ? color2 : FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_2;

        return flag;
    }

    protected generateTransformedThumbnail(texture: Texture<Resource>, asset: IGraphicAsset): Texture<Resource>
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

        sprite.position.set(0);

        return TextureUtils.generateTexture(sprite);

        /* const renderTexture = RenderTexture.create({
            width: asset.width,
            height: asset.height
        });

        PixiApplicationProxy.instance.renderer.render(sprite, {
            renderTexture,
            clear: true,
        });

        return renderTexture; */

        /* const sprite = new NitroSprite(texture);

        const renderTexture = RenderTexture.create({
            width: (asset.width + matrix.tx),
            height: (asset.height + matrix.ty)
        });

        sprite.position.set(0)

        PixiApplicationProxy.instance.renderer.render(sprite, {
            renderTexture,
            clear: true,
            transform: matrix
        });

        return renderTexture; */
    }

    protected getLayerColor(scale: number, layerId: number, colorId: number): number
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        switch(tag)
        {
            case FurnitureGuildIsometricBadgeVisualization.PRIMARY_COLOUR_SPRITE_TAG: return this._color1;
            case FurnitureGuildIsometricBadgeVisualization.SECONDARY_COLOUR_SPRITE_TAG: return this._color2;
        }

        return super.getLayerColor(scale, layerId, colorId);
    }

    protected getLibraryAssetNameForSprite(asset: IGraphicAsset, sprite: IRoomObjectSprite): string
    {
        if(sprite.tag === FurnitureGuildIsometricBadgeVisualization.THUMBNAIL)
        {
            if(this.object && this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_ASSET_NAME))
            {
                return '%group.badge.url%' + this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_ASSET_NAME);
            }
        }

        return super.getLibraryAssetNameForSprite(asset, sprite);
    }

    private getBitmapAsset(name: string)
    {
        const asset = this.asset.getAsset(name);

        if(!asset || !asset.texture) return null;

        return asset.texture;
    }
}
