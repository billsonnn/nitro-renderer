import { IGraphicAsset, IRoomObjectSprite } from '../../../../../room';
import { RoomObjectVariable } from '../../RoomObjectVariable';
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

        this._color1 = color1 ? color1: FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_1;

        const color2 = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_2);

        this._color2 = color2 ? color2: FurnitureGuildIsometricBadgeVisualization.DEFAULT_COLOR_2;

        return flag;
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
