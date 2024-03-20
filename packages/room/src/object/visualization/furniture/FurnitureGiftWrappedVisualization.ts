import { IRoomGeometry, RoomObjectVariable } from '@nitrots/api';
import { FurnitureVisualization } from './FurnitureVisualization';

export class FurnitureGiftWrappedVisualization extends FurnitureVisualization
{
    private _packetType: number = 0;
    private _ribbonType: number = 0;

    public update(geometry: IRoomGeometry, time: number, update: boolean, skipUpdate: boolean): void
    {
        this.updatePresentWrap();

        super.update(geometry, time, update, skipUpdate);
    }

    private updatePresentWrap(): void
    {
        if(!this.object) return;

        const extras = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);

        const local3 = 1000;
        const typeIndex = parseInt(extras);

        this._packetType = Math.floor((typeIndex / local3));
        this._ribbonType = (typeIndex % local3);
    }

    public getFrameNumber(scale: number, layerId: number): number
    {
        if(layerId <= 1) return this._packetType;

        return this._ribbonType;
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
}
