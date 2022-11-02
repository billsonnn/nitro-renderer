import { IGraphicAsset, IRoomObjectSprite, RoomObjectVariable } from '../../../../../api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureGuildCustomizedVisualization extends FurnitureAnimatedVisualization
{
    public static PRIMARY_COLOUR_SPRITE_TAG: string = 'COLOR1';
    public static SECONDARY_COLOUR_SPRITE_TAG: string = 'COLOR2';
    public static BADGE: string = 'BADGE';
    public static DEFAULT_COLOR_1: number = 0xEEEEEE;
    public static DEFAULT_COLOR_2: number = 0x4B4B4B;

    private _color1: number;
    private _color2: number;
    private _badgeAssetNameNormalScale: string;
    private _badgeAssetNameSmallScale: string;

    constructor()
    {
        super();

        this._color1 = FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_1;
        this._color2 = FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_2;
        this._badgeAssetNameNormalScale = '';
        this._badgeAssetNameSmallScale = '';
    }

    protected updateModel(scale: number): boolean
    {
        const flag = super.updateModel(scale);

        if(this._badgeAssetNameNormalScale === '')
        {
            const assetName = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_ASSET_NAME);

            if(assetName)
            {
                this._badgeAssetNameNormalScale = assetName;
                this._badgeAssetNameSmallScale = (this._badgeAssetNameNormalScale + '_32');
            }
        }

        const color1 = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_1);

        this._color1 = color1 ? color1 : FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_1;

        const color2 = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_COLOR_2);

        this._color2 = color2 ? color2 : FurnitureGuildCustomizedVisualization.DEFAULT_COLOR_2;

        return flag;
    }

    protected getLayerColor(scale: number, layerId: number, colorId: number): number
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        switch(tag)
        {
            case FurnitureGuildCustomizedVisualization.PRIMARY_COLOUR_SPRITE_TAG: return this._color1;
            case FurnitureGuildCustomizedVisualization.SECONDARY_COLOUR_SPRITE_TAG: return this._color2;
        }

        return super.getLayerColor(scale, layerId, colorId);
    }

    public getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this._direction, layerId);

        if(tag === FurnitureGuildCustomizedVisualization.BADGE)
        {
            if(scale === 32) return this._badgeAssetNameSmallScale;

            return this._badgeAssetNameNormalScale;
        }

        return super.getSpriteAssetName(scale, layerId);
    }

    protected getLibraryAssetNameForSprite(asset: IGraphicAsset, sprite: IRoomObjectSprite): string
    {
        if(sprite.tag === FurnitureGuildCustomizedVisualization.BADGE)
        {
            return '%group.badge.url%' + sprite.libraryAssetName.replace('badge_', '');
        }

        return super.getLibraryAssetNameForSprite(asset, sprite);
    }
}
