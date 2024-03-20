import { RoomObjectVariable } from '@nitrots/api';
import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureBadgeDisplayVisualization extends FurnitureAnimatedVisualization
{
    private static BADGE: string = 'BADGE';

    private _badgeId: string = '';
    private _badgeAssetNameNormalScale: string = '';
    private _badgeAssetNameSmallScale: string = '';
    private _badgeVisibleInState: number = -1;

    protected updateModel(scale: number): boolean
    {
        let updateModel = super.updateModel(scale);

        const badgeStatus = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BADGE_IMAGE_STATUS);
        const badgeId = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_BADGE_ASSET_NAME);

        if(badgeStatus === -1)
        {
            this._badgeAssetNameNormalScale = '';
            this._badgeAssetNameSmallScale = '';
        }

        else if((badgeStatus === 1) && (badgeId !== this._badgeId))
        {
            this._badgeId = badgeId;
            this._badgeAssetNameNormalScale = this._badgeId;

            if(this._badgeAssetNameSmallScale === '') this._badgeAssetNameSmallScale = this._badgeAssetNameNormalScale + '_32';

            const visibleInState = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_BADGE_VISIBLE_IN_STATE);

            if(!isNaN(visibleInState)) this._badgeVisibleInState = visibleInState;

            updateModel = true;
        }

        return updateModel;
    }

    protected getSpriteAssetName(scale: number, layerId: number): string
    {
        const tag = this.getLayerTag(scale, this.direction, layerId);

        if((tag !== FurnitureBadgeDisplayVisualization.BADGE) || ((this._badgeVisibleInState !== -1) && (this.object.getState(0) !== this._badgeVisibleInState))) return super.getSpriteAssetName(scale, layerId);

        if(scale === 32) return this._badgeAssetNameSmallScale;

        return this._badgeAssetNameNormalScale;
    }

    protected getLayerXOffset(scale: number, direction: number, layerId: number): number
    {
        let offset = super.getLayerXOffset(scale, direction, layerId);

        if(this.getLayerTag(scale, direction, layerId) === FurnitureBadgeDisplayVisualization.BADGE)
        {
            const asset = this.getAsset(((scale === 32) ? this._badgeAssetNameSmallScale : this._badgeAssetNameNormalScale), layerId);

            if(asset)
            {
                if(scale === 64) offset += ((40 - asset.width) / 2);
                else offset += ((20 - asset.width) / 2);
            }
        }

        return offset;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        let offset = super.getLayerYOffset(scale, direction, layerId);

        if(this.getLayerTag(scale, direction, layerId) === FurnitureBadgeDisplayVisualization.BADGE)
        {
            const asset = this.getAsset(((scale === 32) ? this._badgeAssetNameSmallScale : this._badgeAssetNameNormalScale), layerId);

            if(asset)
            {
                if(scale === 64) offset += ((40 - asset.height) / 2);
                else offset += ((20 - asset.height) / 2);
            }
        }

        return offset;
    }
}
