import { IRoomGeometry, RoomObjectVariable } from '@nitrots/api';
import { FurnitureFireworksVisualization } from './FurnitureFireworksVisualization';

export class FurnitureGiftWrappedFireworksVisualization extends FurnitureFireworksVisualization
{
    private static PRESENT_DEFAULT_STATE: number = 0;
    private static MAX_PACKET_TYPE_VALUE: number = 9;
    private static MAX_RIBBON_TYPE_VALUE: number = 11;

    private _packetType: number = 0;
    private _ribbonType: number = 0;
    private _lastAnimationId: number = 0;

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean)
    {
        this.updatePresentWrap();

        super.update(geometry, time, update, skipUpdate);
    }

    private updatePresentWrap(): void
    {
        if(!this.object) return;

        const local3 = 1000;
        const extras = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);

        const typeIndex = parseInt(extras);
        const packetType = Math.floor((typeIndex / local3));
        const ribbonType = (typeIndex % local3);

        this._packetType = ((packetType > FurnitureGiftWrappedFireworksVisualization.MAX_PACKET_TYPE_VALUE) ? 0 : packetType);
        this._ribbonType = ((ribbonType > FurnitureGiftWrappedFireworksVisualization.MAX_RIBBON_TYPE_VALUE) ? 0 : ribbonType);
    }

    public getFrameNumber(scale: number, layerId: number): number
    {
        if(this._lastAnimationId === FurnitureGiftWrappedFireworksVisualization.PRESENT_DEFAULT_STATE)
        {
            if(layerId <= 1) return this._packetType;

            if(layerId === 2) return this._ribbonType;
        }

        return super.getFrameNumber(scale, layerId);
    }

    public getSpriteAssetName(scale: number, layerId: number): string
    {
        const size = this.getValidSize(scale);

        let assetName = this._type;
        let layerCode = '';

        if(layerId < (this.spriteCount - 1))
        {
            layerCode = String.fromCharCode(('a'.charCodeAt(0) + layerId));
        }
        else
        {
            layerCode = 'sd';
        }

        const frameNumber = this.getFrameNumber(scale, layerId);

        assetName = (assetName + ((((('_' + size) + '_') + layerCode) + '_') + this.direction));
        assetName = (assetName + ('_' + frameNumber));

        return assetName;
    }

    protected setAnimation(animationId: number): void
    {
        this._lastAnimationId = animationId;

        super.setAnimation(animationId);
    }
}
