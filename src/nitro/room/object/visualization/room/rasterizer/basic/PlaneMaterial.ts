import { Graphics } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { PlaneMaterialCellMatrix } from './PlaneMaterialCellMatrix';

export class PlaneMaterial
{
    public static _Str_3268: number = -1;
    public static _Str_3271: number = 1;

    private _planeMaterialItems: PlaneMaterialCellMatrix[];
    private _isCached: boolean;

    constructor()
    {
        this._planeMaterialItems    = [];
        this._isCached              = false;
    }

    public dispose(): void
    {
        if(this._planeMaterialItems && this._planeMaterialItems.length)
        {
            for(const item of this._planeMaterialItems)
            {
                if(!item) continue;

                item.dispose();
            }

            this._planeMaterialItems = null;
        }

        this._isCached = false;
    }

    public _Str_3355(): void
    {
        if(!this._isCached) return;

        if(this._planeMaterialItems && this._planeMaterialItems.length)
        {
            for(const item of this._planeMaterialItems)
            {
                if(!item) continue;

                item._Str_3355();
            }
        }

        this._isCached = false;
    }

    public _Str_24503(k: number, _arg_2: number, _arg_3: number, _arg_4: number = -1, _arg_5: number = 1, _arg_6: number = -1, _arg_7: number = 1): PlaneMaterialCellMatrix
    {
        const cellMatrix = new PlaneMaterialCellMatrix(k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7);

        this._planeMaterialItems.push(cellMatrix);

        return cellMatrix;
    }

    public _Str_21968(k: IVector3D): PlaneMaterialCellMatrix
    {
        if(!k) return null;

        if(this._planeMaterialItems && this._planeMaterialItems.length)
        {
            for(const item of this._planeMaterialItems)
            {
                if(!item) continue;

                if((((k.x >= item.normalMinX) && (k.x <= item.normalMaxX)) && (k.y >= item.normalMinY)) && (k.y <= item.normalMaxY)) return item;
            }
        }

        return null;
    }

    public render(k: Graphics, _arg_2: number, _arg_3: number, _arg_4: IVector3D, _arg_5: boolean, _arg_6: number, _arg_7: number, _arg_8: boolean): Graphics
    {
        if(_arg_2 < 1) _arg_2 = 1;

        if(_arg_3 < 1) _arg_3 = 1;

        const cellMatrix = this._Str_21968(_arg_4);

        if(!cellMatrix) return null;

        this._isCached = true;

        return cellMatrix.render(k, _arg_2, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_8);
    }
}