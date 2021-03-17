import { IGraphicAsset } from '../../../../../../room/object/visualization/utils/IGraphicAsset';
import { IVector3D } from '../../../../../../room/utils/IVector3D';
import { PlaneMaskBitmap } from './PlaneMaskBitmap';

export class PlaneMaskVisualization
{
    public static _Str_3268: number = -1;
    public static _Str_3271: number = 1;

    private _bitmaps: PlaneMaskBitmap[];

    constructor()
    {
        this._bitmaps = [];
    }

    public dispose(): void
    {
        for(const mask of this._bitmaps)
        {
            if(!mask) continue;

            mask.dispose();
        }

        this._bitmaps = null;
    }

    public _Str_16790(k: IGraphicAsset, _arg_2: number = -1, _arg_3: number = 1, _arg_4: number = -1, _arg_5: number = 1): void
    {
        this._bitmaps.push(new PlaneMaskBitmap(k, _arg_2, _arg_3, _arg_4, _arg_5));
    }

    public getAsset(k: IVector3D): IGraphicAsset
    {
        if(!k) return null;

        for(const mask of this._bitmaps)
        {
            if(!mask) continue;

            if((((k.x >= mask.normalMinX) && (k.x <= mask.normalMaxX)) && (k.y >= mask.normalMinY)) && (k.y <= mask.normalMaxY))
            {
                return mask.asset;
            }
        }

        return null;
    }
}