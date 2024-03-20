import { RoomObjectVariable } from '@nitrots/api';
import { FurnitureAnimatedVisualization } from '../furniture';

export class TileCursorVisualization extends FurnitureAnimatedVisualization
{
    private _tileHeight: number;

    constructor()
    {
        super();

        this._tileHeight = 0;
    }

    protected getLayerYOffset(scale: number, direction: number, layerId: number): number
    {
        if(layerId === 1)
        {
            this._tileHeight = this.object.model.getValue<number>(RoomObjectVariable.TILE_CURSOR_HEIGHT);

            return -(this._tileHeight) * 32; // 32 = scale / 2
        }

        return super.getLayerYOffset(scale, direction, layerId);
    }
}
