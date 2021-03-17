import { Graphics } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { PlaneMaterialCell } from './PlaneMaterialCell';

export class PlaneMaterialCellColumn
{
    public static _Str_9685: number = 0;
    public static _Str_7916: number = 1;
    public static _Str_6087: number = 2;
    public static _Str_6114: number = 3;
    public static _Str_6187: number = 4;
    public static _Str_6063: number = 5;

    private _cells: PlaneMaterialCell[];
    private _repeatMode: number;
    private _width: number;
    private _cachedBitmapData: Graphics;
    private _cachedBitmapNormal: Vector3d;
    private _cachedBitmapDataOffsetX: number;
    private _cachedBitmapDataOffsetY: number;
    private _isCached: boolean;
    private _isStatic: boolean;

    constructor(k: number, _arg_2: PlaneMaterialCell[], _arg_3: number = 1)
    {
        this._cells                     = [];
        this._repeatMode                = _arg_3;
        this._width                     = (k < 1) ? 1 : k;
        this._cachedBitmapData          = null;
        this._cachedBitmapNormal        = null;
        this._cachedBitmapDataOffsetX   = 0;
        this._cachedBitmapDataOffsetY   = 0;
        this._isCached                  = false;
        this._isStatic                  = true;

        if(_arg_2 && _arg_2.length)
        {
            let cellIndex = 0;

            while(cellIndex < _arg_2.length)
            {
                const cell = _arg_2[cellIndex];

                if(cell)
                {
                    this._cells.push(cell);

                    if(!cell.isStatic) this._isStatic = false;
                }

                cellIndex++;
            }
        }
    }

    public get isStatic(): boolean
    {
        return this._isStatic;
    }

    public _Str_24523(): boolean
    {
        return !(this._repeatMode === PlaneMaterialCellColumn._Str_9685);
    }

    public get width(): number
    {
        return this._width;
    }

    public dispose(): void
    {
        if(this._cells && this._cells.length)
        {
            for(const cell of this._cells)
            {
                if(!cell) continue;

                cell.dispose();
            }

            this._cells = null;
        }

        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }

        if(this._cachedBitmapNormal) this._cachedBitmapNormal = null;
    }

    public _Str_3355(): void
    {
        if(!this._isCached) return;

        if(this._cachedBitmapData)
        {
            this._cachedBitmapData.destroy();

            this._cachedBitmapData = null;
        }

        if(this._cachedBitmapNormal)
        {
            this._cachedBitmapNormal.x = 0;
            this._cachedBitmapNormal.y = 0;
            this._cachedBitmapNormal.z = 0;
        }

        if(this._cells && this._cells.length)
        {
            for(const cell of this._cells)
            {
                if(!cell) continue;

                cell._Str_3355();
            }
        }

        this._isCached = false;
    }

    public render(height: number, normal: IVector3D, offsetX: number, offsetY: number): Graphics
    {
        let ht = 0;

        if(this._repeatMode == PlaneMaterialCellColumn._Str_9685)
        {
            ht      = this._Str_19857(this._cells, normal);
            height  = ht;
        }

        if(!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if(this.isStatic)
        {
            if(this._cachedBitmapData)
            {
                if((this._cachedBitmapData.height === height) && Vector3d.isEqual(this._cachedBitmapNormal, normal) && (this._cachedBitmapDataOffsetX === offsetX) && (this._cachedBitmapDataOffsetY === offsetY))
                {
                    return this._cachedBitmapData;
                }

                this._cachedBitmapData.destroy();

                this._cachedBitmapData = null;
            }
        }
        else
        {
            if(this._cachedBitmapData)
            {
                if(this._cachedBitmapData.height === height)
                {
                    this._cachedBitmapData
                        .beginFill(0xFFFFFF)
                        .drawRect(0, 0, this._cachedBitmapData.width, height)
                        .endFill();
                }
                else
                {
                    this._cachedBitmapData.destroy();

                    this._cachedBitmapData = null;
                }
            }
        }

        this._isCached = true;

        if(!this._cachedBitmapData)
        {
            this._cachedBitmapData = new Graphics()
                .beginFill(0xFFFFFF)
                .drawRect(0, 0, this._width, height)
                .endFill();
        }

        this._cachedBitmapNormal.assign(normal);
        this._cachedBitmapDataOffsetX = offsetX;
        this._cachedBitmapDataOffsetY = offsetY;

        if(!this._cells.length) return this._cachedBitmapData;

        switch(this._repeatMode)
        {
            case PlaneMaterialCellColumn._Str_9685:
                this._Str_25839(normal);
                break;
            case PlaneMaterialCellColumn._Str_6087:
                console.log('tru2');
                //     this._Str_18476(normal);
                break;
            case PlaneMaterialCellColumn._Str_6114:
                console.log('tru3');
                //     this._Str_17295(normal);
                break;
            case PlaneMaterialCellColumn._Str_6187:
                console.log('tru4');
                //     this._Str_18019(normal);
                break;
            case PlaneMaterialCellColumn._Str_6063:
                console.log('tru5');
                //     this._Str_16099(normal);
                break;
            default:
                this._Str_18711(normal, offsetX, offsetY);
                break;
        }

        return this._cachedBitmapData;
    }

    private _Str_19857(k: PlaneMaterialCell[], _arg_2: IVector3D): number
    {
        if(!k || !k.length) return 0;

        let height          = 0;
        let cellIterator    = 0;

        while(cellIterator < k.length)
        {
            const cell = k[cellIterator];

            if(cell) height += cell._Str_9599(_arg_2);

            cellIterator++;
        }

        return height;
    }

    private _Str_4757(k: PlaneMaterialCell[], _arg_2: number, _arg_3: boolean, _arg_4: IVector3D, _arg_5: number = 0, _arg_6: number = 0): number
    {
        if(((!k || !k.length) || !this._cachedBitmapData)) return _arg_2;

        let cellIndex = 0;

        while(cellIndex < k.length)
        {
            let cell: PlaneMaterialCell = null;

            if(_arg_3)
            {
                cell = k[cellIndex];
            }
            else
            {
                cell = k[((k.length - 1) - cellIndex)];
            }

            if(cell)
            {
                const graphic = cell.render(_arg_4, _arg_5, _arg_6);

                if(graphic)
                {
                    if(!_arg_3) _arg_2 -= graphic.height;

                    graphic.y = _arg_2;

                    this._cachedBitmapData.addChild(graphic);

                    if(_arg_3) _arg_2 = (_arg_2 + graphic.height);

                    if(((_arg_3) && (_arg_2 >= this._cachedBitmapData.height)) || ((!(_arg_3)) && (_arg_2 <= 0))) return _arg_2;
                }
            }

            cellIndex++;
        }

        return _arg_2;
    }

    private _Str_25839(k: IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        this._Str_4757(this._cells, 0, true, k);
    }

    private _Str_18711(k: IVector3D, _arg_2: number, _arg_3: number): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        let index = 0;

        while(index < this._cachedBitmapData.height)
        {
            index = this._Str_4757(this._cells, index, true, k, _arg_2, _arg_3);

            if(!index) return;
        }
    }

    // private _Str_18476(k:IVector3D): void
    // {
    //     if (((this._cells.length == 0) || (this._cachedBitmapData == null)))
    //     {
    //         return;
    //     }
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3:BitmapData;
    //     var _local_4:Array = [];
    //     var _local_5: number;
    //     var _local_6: number;
    //     var _local_7: number;
    //     _local_7 = 1;
    //     while (_local_7 < (this._cells.length - 1))
    //     {
    //         _local_2 = (this._cells[_local_7] as PlaneMaterialCell);
    //         if (_local_2 != null)
    //         {
    //             _local_6 = _local_2._Str_9599(k);
    //             if (_local_6 > 0)
    //             {
    //                 _local_5 = (_local_5 + _local_6);
    //                 _local_4.push(_local_2);
    //             }
    //         }
    //         _local_7++;
    //     }
    //     if (this._cells.length == 1)
    //     {
    //         _local_2 = (this._cells[0] as PlaneMaterialCell);
    //         if (_local_2 != null)
    //         {
    //             _local_6 = _local_2._Str_9599(k);
    //             if (_local_6 > 0)
    //             {
    //                 _local_5 = (_local_5 + _local_6);
    //                 _local_4.push(_local_2);
    //             }
    //         }
    //     }
    //     var _local_8:* = ((this._cachedBitmapData.height - _local_5) >> 1);
    //     var _local_9: number = this._Str_4757(_local_4, _local_8, true, k);
    //     _local_2 = (this._cells[0] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_8 >= 0)
    //         {
    //             _local_8 = this._Str_4757(_local_4, _local_8, false, k);
    //         }
    //     }
    //     _local_2 = (this._cells[(this._cells.length - 1)] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_9 < this._cachedBitmapData.height)
    //         {
    //             _local_9 = this._Str_4757(_local_4, _local_9, true, k);
    //         }
    //     }
    // }

    // private _Str_17295(k:IVector3D): void
    // {
    //     var _local_13: number;
    //     var _local_14: number;
    //     var _local_15: number;
    //     var _local_16:Array;
    //     if (((this._cells.length == 0) || (this._cachedBitmapData == null)))
    //     {
    //         return;
    //     }
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3:BitmapData;
    //     var _local_4:Array = [];
    //     var _local_5:Array = [];
    //     var _local_6: number;
    //     var _local_7: number;
    //     var _local_8: number;
    //     var _local_9: number;
    //     _local_9 = 0;
    //     while (_local_9 < (this._cells.length >> 1))
    //     {
    //         _local_2 = (this._cells[_local_9] as PlaneMaterialCell);
    //         if (_local_2 != null)
    //         {
    //             _local_8 = _local_2._Str_9599(k);
    //             if (_local_8 > 0)
    //             {
    //                 _local_6 = (_local_6 + _local_8);
    //                 _local_4.push(_local_2);
    //             }
    //         }
    //         _local_9++;
    //     }
    //     _local_9 = ((this._cells.length >> 1) + 1);
    //     while (_local_9 < this._cells.length)
    //     {
    //         _local_2 = (this._cells[_local_9] as PlaneMaterialCell);
    //         if (_local_2 != null)
    //         {
    //             _local_8 = _local_2._Str_9599(k);
    //             if (_local_8 > 0)
    //             {
    //                 _local_7 = (_local_7 + _local_8);
    //                 _local_5.push(_local_2);
    //             }
    //         }
    //         _local_9++;
    //     }
    //     var _local_10: number;
    //     var _local_11: number;
    //     var _local_12: number = this._cachedBitmapData.height;
    //     if ((_local_6 + _local_7) > this._cachedBitmapData.height)
    //     {
    //         _local_10 = ((_local_6 + _local_7) - this._cachedBitmapData.height);
    //         _local_11 = (_local_11 - (_local_10 >> 1));
    //         _local_12 = (_local_12 + (_local_10 - (_local_10 >> 1)));
    //     }
    //     if (_local_10 == 0)
    //     {
    //         _local_2 = (this._cells[(this._cells.length >> 1)] as PlaneMaterialCell);
    //         if (_local_2 != null)
    //         {
    //             _local_8 = _local_2._Str_9599(k);
    //             if (_local_8 > 0)
    //             {
    //                 _local_13 = (this._cachedBitmapData.height - (_local_6 + _local_7));
    //                 _local_14 = (Math.ceil((_local_13 / _local_8)) * _local_8);
    //                 _local_11 = (_local_6 - ((_local_14 - _local_13) >> 1));
    //                 _local_15 = (_local_11 + _local_14);
    //                 _local_16 = [_local_2];
    //                 while (_local_11 < _local_15)
    //                 {
    //                     _local_11 = this._Str_4757(_local_16, _local_11, true, k);
    //                 }
    //             }
    //         }
    //     }
    //     _local_11 = 0;
    //     this._Str_4757(_local_4, _local_11, true, k);
    //     this._Str_4757(_local_5, _local_12, false, k);
    // }

    // private _Str_18019(k:IVector3D): void
    // {
    //     var _local_4:Array;
    //     if (((this._cells.length == 0) || (this._cachedBitmapData == null)))
    //     {
    //         return;
    //     }
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3: number = this._cachedBitmapData.height;
    //     _local_3 = this._Str_4757(this._cells, _local_3, false, k);
    //     _local_2 = (this._cells[0] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_3 >= 0)
    //         {
    //             _local_3 = this._Str_4757(_local_4, _local_3, false, k);
    //         }
    //     }
    // }

    // private _Str_16099(k: IVector3D): void
    // {
    //     if(!this._cells.length || !this._cachedBitmapData) return;


    //     var _local_4:Array;
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3: number;
    //     _local_3 = this._Str_4757(this._cells, _local_3, true, k);
    //     _local_2 = (this._cells[(this._cells.length - 1)] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_3 < this._cachedBitmapData.height)
    //         {
    //             _local_3 = this._Str_4757(_local_4, _local_3, true, k);
    //         }
    //     }
    // }

    public _Str_22299(): PlaneMaterialCell[]
    {
        return this._cells;
    }
}