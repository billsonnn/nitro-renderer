import { Graphics, Point, Rectangle } from 'pixi.js';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { TextureUtils } from '../../../../../../../room/utils/TextureUtils';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { RoomVisualization } from '../../RoomVisualization';
import { Randomizer } from '../../utils/Randomizer';
import { PlaneMaterialCell } from './PlaneMaterialCell';
import { PlaneMaterialCellColumn } from './PlaneMaterialCellColumn';

export class PlaneMaterialCellMatrix
{
    public static _Str_7916: number     = 1;
    public static _Str_6087: number     = 2;
    public static _Str_6114: number     = 3;
    public static _Str_6187: number     = 4;
    public static _Str_6063: number     = 5;
    public static _Str_9127: number     = 6;
    public static _Str_18632: number    = PlaneMaterialCellMatrix._Str_7916;//1
    public static _Str_3268: number     = -1;
    public static _Str_3271: number     = 1;
    public static ALIGN_TOP: number     = 1;
    public static _Str_3606: number     = 2;
    public static _Str_6914: number     = PlaneMaterialCellMatrix.ALIGN_TOP;//1

    private _columns: PlaneMaterialCellColumn[];
    private _repeatMode: number = 1;
    private _align: number = 1;
    private _cachedBitmapData: Graphics;
    private _cachedBitmapNormal: Vector3d = null;
    private _cachedBitmapHeight: number = 0;
    private _isCached: boolean = false;
    private _isStatic: boolean = true;
    private _normalMinX: number = -1;
    private _normalMaxX: number = 1;
    private _normalMinY: number = -1;
    private _normalMaxY: number = 1;

    constructor(k: number, _arg_2: number=1, _arg_3: number=1, _arg_4: number=-1, _arg_5: number=1, _arg_6: number=-1, _arg_7: number=1)
    {
        this._columns = [];
        if(k < 1)
        {
            k = 1;
        }
        let _local_8 = 0;
        while(_local_8 < k)
        {
            this._columns.push(null);
            _local_8++;
        }
        this._repeatMode = _arg_2;
        this._align = _arg_3;
        this._normalMinX = _arg_4;
        this._normalMaxX = _arg_5;
        this._normalMinY = _arg_6;
        this._normalMaxY = _arg_7;
        if(this._repeatMode == PlaneMaterialCellMatrix._Str_9127)
        {
            this._isStatic = false;
        }
    }

    private static _Str_12526(k: number): number
    {
        return ((Randomizer._Str_1612(1, 0, (k * 17631))[0]) % k);
    }

    public get normalMinX(): number
    {
        return this._normalMinX;
    }

    public get normalMaxX(): number
    {
        return this._normalMaxX;
    }

    public get normalMinY(): number
    {
        return this._normalMinY;
    }

    public get normalMaxY(): number
    {
        return this._normalMaxY;
    }

    public _Str_14945(): boolean
    {
        return this._align === PlaneMaterialCellMatrix._Str_3606;
    }

    public get isStatic(): boolean
    {
        return this._isStatic;
    }

    public dispose(): void
    {
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

        if(this._columns && this._columns.length)
        {
            for(const column of this._columns)
            {
                if(!column) continue;

                column._Str_3355();
            }
        }

        this._isCached = false;
    }

    public _Str_22372(k: number, _arg_2: number, _arg_3: PlaneMaterialCell[], _arg_4: number=1): boolean
    {
        if((k < 0) || (k >= this._columns.length)) return false;

        const newColumn = new PlaneMaterialCellColumn(_arg_2, _arg_3, _arg_4);
        const oldColumn = this._columns[k];

        if(oldColumn) oldColumn.dispose();

        this._columns[k] = newColumn;

        if(newColumn && !newColumn.isStatic) this._isStatic = false;

        return true;
    }

    public render(canvas: Graphics, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, topAlign: boolean): Graphics
    {
        if(width < 1) width = 1;

        if(height < 1) height = 1;

        if(!canvas || (canvas.width !== width) || (canvas.height !== height)) canvas = null;

        if(!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if(this.isStatic)
        {
            if(this._cachedBitmapData)
            {
                if(((this._cachedBitmapData.width === width) && (this._cachedBitmapData.height == height)) && Vector3d.isEqual(this._cachedBitmapNormal, normal))
                {
                    if(canvas)
                    {
                        this._Str_17578(canvas, this._cachedBitmapHeight, offsetY, topAlign);

                        return canvas;
                    }

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
                if((this._cachedBitmapData.width === width) && (this._cachedBitmapData.height === height))
                {
                    this._cachedBitmapData
                        .beginFill(0xFFFFFF)
                        .drawRect(0, 0, width, height)
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
        this._cachedBitmapNormal.assign(normal);

        if(!useTexture)
        {
            this._cachedBitmapHeight = height;

            if(!this._cachedBitmapData)
            {
                const graphic = new Graphics()
                    .beginFill(0xFFFFFF)
                    .drawRect(0, 0, width, height)
                    .endFill();

                this._cachedBitmapData = graphic;
            }
            else
            {
                this._cachedBitmapData
                    .beginFill(0xFFFFFF)
                    .drawRect(0, 0, width, height)
                    .endFill();
            }

            if(canvas)
            {
                this._Str_17578(canvas, height, offsetY, topAlign);

                return canvas;
            }

            return this._cachedBitmapData;
        }

        if(!this._cachedBitmapData)
        {
            this._cachedBitmapHeight = height;

            const graphic = new Graphics()
                .beginFill(0xFFFFFF)
                .drawRect(0, 0, width, height)
                .endFill();

            this._cachedBitmapData = graphic;
        }

        const columns: Graphics[] = [];

        let columnIndex = 0;

        while(columnIndex < this._columns.length)
        {
            const column = this._columns[columnIndex];

            if(column)
            {
                const columnBitmapData = column.render(height, normal, offsetX, offsetY);

                if(columnBitmapData) columns.push(columnBitmapData);
            }

            columnIndex++;
        }

        if(!columns.length)
        {
            if(canvas) return canvas;

            return this._cachedBitmapData;
        }

        let maxColumnHeight = 0;

        switch(this._repeatMode)
        {
            case PlaneMaterialCellMatrix._Str_6087:
            //     maxColumnHeight = this._Str_18476(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix._Str_6114:
            //     maxColumnHeight = this._Str_17295(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix._Str_6187:
            //     maxColumnHeight = this._Str_18019(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix._Str_6063:
            //     maxColumnHeight = this._Str_16099(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix._Str_9127:
            //     maxColumnHeight = this._Str_25678(this._cachedBitmapData, columns);
                break;
            default:
                maxColumnHeight = this._Str_18711(this._cachedBitmapData, columns);
                break;
        }

        this._cachedBitmapHeight = maxColumnHeight;

        if(canvas)
        {
            this._Str_17578(canvas, maxColumnHeight, offsetY, topAlign);

            return canvas;
        }

        return this._cachedBitmapData;
    }

    private _Str_17578(k: Graphics, _arg_2: number, _arg_3: number, _arg_4: boolean): void
    {
        if(!k || !this._cachedBitmapData || (k === this._cachedBitmapData)) return;

        if(!_arg_4) _arg_3 = ((k.height - _arg_2) - _arg_3);

        let _local_5: Rectangle;

        if(this._align == PlaneMaterialCellMatrix.ALIGN_TOP)
        {
            _local_5 = new Rectangle(0, 0, this._cachedBitmapData.width, this._cachedBitmapHeight);
        }
        else
        {
            _local_5 = new Rectangle(0, (this._cachedBitmapData.height - this._cachedBitmapHeight), this._cachedBitmapData.width, this._cachedBitmapHeight);
        }

        const texture = TextureUtils.generateTexture(this._cachedBitmapData, _local_5);

        if(texture)
        {
            k
                .beginTextureFill({ texture })
                .drawRect(0, _arg_3, _local_5.width, _local_5.height)
                .endFill();
        }
    }

    private _Str_25859(k: Graphics[]): number
    {
        if(!k || !k.length) return 0;

        let width = 0;

        for(const graphic of k)
        {
            if(!graphic) continue;

            width += graphic.width;
        }

        return width;
    }

    private _Str_4606(k: Graphics, _arg_2: Graphics[], _arg_3: number, _arg_4: boolean): Point
    {
        if(!k || !_arg_2 || !_arg_2.length) return new Point(_arg_3, 0);

        let height = 0;
        let _local_6: Graphics = null;
        let _local_7 = 0;

        while(_local_7 < _arg_2.length)
        {
            if(_arg_4)
            {
                _local_6 = _arg_2[_local_7];
            }
            else
            {
                _local_6 = _arg_2[((_arg_2.length - 1) - _local_7)];
            }
            if(_local_6 != null)
            {
                if(!_arg_4)
                {
                    _arg_3 = (_arg_3 - _local_6.width);
                }
                let _local_8 = 0;
                if(this._align == PlaneMaterialCellMatrix._Str_3606)
                {
                    _local_8 = (k.height - _local_6.height);
                }

                let texture = RoomVisualization.getTextureCache(_local_6);

                if(!texture)
                {
                    texture = TextureUtils.generateTexture(_local_6, new Rectangle(0, 0, _local_6.width, _local_6.height));

                    RoomVisualization.addTextureCache(_local_6, texture);
                }

                k.beginTextureFill({ texture });
                k.drawRect(_arg_3, _local_8, texture.width, texture.height);
                k.endFill();

                if(_local_6.height > height)
                {
                    height = _local_6.height;
                }
                if(_arg_4)
                {
                    _arg_3 = (_arg_3 + _local_6.width);
                }
                if((((_arg_4) && (_arg_3 >= k.width)) || ((!(_arg_4)) && (_arg_3 <= 0))))
                {
                    return new Point(_arg_3, height);
                }
            }
            _local_7++;
        }
        return new Point(_arg_3, height);
    }

    private _Str_18711(k: Graphics, _arg_2: Graphics[]): number
    {
        if(!k || !_arg_2 || !_arg_2.length) return 0;

        const totalWidth: number = this._Str_25859(_arg_2);

        let x       = 0;
        let y       = 0;

        while(x < k.width)
        {
            const point = this._Str_4606(k, _arg_2, x, true);

            x = point.x;

            if(point.y > y) y = point.y;

            if(!point.x) return y;
        }

        return y;
    }

    // private _Str_18476(k:BitmapData, _arg_2:Array): number
    // {
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5:Array = [];
    //     var _local_6: number;
    //     var _local_7: number;
    //     _local_7 = 1;
    //     while (_local_7 < (_arg_2.length - 1))
    //     {
    //         _local_4 = (_arg_2[_local_7] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_6 = (_local_6 + _local_4.width);
    //             _local_5.push(_local_4);
    //         }
    //         _local_7++;
    //     }
    //     if (this._columns.length == 1)
    //     {
    //         _local_4 = (this._columns[0] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_6 = _local_4.width;
    //             _local_5.push(_local_4);
    //         }
    //     }
    //     var _local_8:* = ((k.width - _local_6) >> 1);
    //     var _local_9:Point;
    //     _local_9 = this._Str_4606(k, _local_5, _local_8, true);
    //     var _local_10: number = _local_9.x;
    //     if (_local_9.y > _local_3)
    //     {
    //         _local_3 = _local_9.y;
    //     }
    //     _local_4 = (_arg_2[0] as BitmapData);
    //     if (_local_4 != null)
    //     {
    //         _local_5 = [_local_4];
    //         while (_local_8 >= 0)
    //         {
    //             _local_9 = this._Str_4606(k, _local_5, _local_8, false);
    //             _local_8 = _local_9.x;
    //             if (_local_9.y > _local_3)
    //             {
    //                 _local_3 = _local_9.y;
    //             }
    //         }
    //     }
    //     _local_4 = (_arg_2[(_arg_2.length - 1)] as BitmapData);
    //     if (_local_4 != null)
    //     {
    //         _local_5 = [_local_4];
    //         while (_local_10 < k.height)
    //         {
    //             _local_9 = this._Str_4606(k, _local_5, _local_10, true);
    //             _local_10 = _local_9.x;
    //             if (_local_9.y > _local_3)
    //             {
    //                 _local_3 = _local_9.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    // private _Str_17295(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_14: number;
    //     var _local_15: number;
    //     var _local_16: number;
    //     var _local_17: number;
    //     var _local_18:Array;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5:Array = [];
    //     var _local_6:Array = [];
    //     var _local_7: number;
    //     var _local_8: number;
    //     var _local_9: number;
    //     _local_9 = 0;
    //     while (_local_9 < (_arg_2.length >> 1))
    //     {
    //         _local_4 = (_arg_2[_local_9] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_7 = (_local_7 + _local_4.width);
    //             _local_5.push(_local_4);
    //         }
    //         _local_9++;
    //     }
    //     _local_9 = ((_arg_2.length >> 1) + 1);
    //     while (_local_9 < _arg_2.length)
    //     {
    //         _local_4 = (_arg_2[_local_9] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_8 = (_local_8 + _local_4.width);
    //             _local_6.push(_local_4);
    //         }
    //         _local_9++;
    //     }
    //     var _local_10:Point;
    //     var _local_11: number;
    //     var _local_12: number;
    //     var _local_13: number = k.width;
    //     if ((_local_7 + _local_8) > k.width)
    //     {
    //         _local_11 = ((_local_7 + _local_8) - k.width);
    //         _local_12 = (_local_12 - (_local_11 >> 1));
    //         _local_13 = (_local_13 + (_local_11 - (_local_11 >> 1)));
    //     }
    //     if (_local_11 == 0)
    //     {
    //         _local_4 = (_arg_2[(_arg_2.length >> 1)] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_14 = _local_4.width;
    //             _local_15 = (k.width - (_local_7 + _local_8));
    //             _local_16 = (Math.ceil((_local_15 / _local_14)) * _local_14);
    //             _local_12 = (_local_7 - ((_local_16 - _local_15) >> 1));
    //             _local_17 = (_local_12 + _local_16);
    //             _local_18 = [_local_4];
    //             while (_local_12 < _local_17)
    //             {
    //                 _local_10 = this._Str_4606(k, _local_18, _local_12, true);
    //                 _local_12 = _local_10.x;
    //                 if (_local_10.y > _local_3)
    //                 {
    //                     _local_3 = _local_10.y;
    //                 }
    //             }
    //         }
    //     }
    //     _local_12 = 0;
    //     _local_10 = this._Str_4606(k, _local_5, _local_12, true);
    //     if (_local_10.y > _local_3)
    //     {
    //         _local_3 = _local_10.y;
    //     }
    //     _local_10 = this._Str_4606(k, _local_6, _local_13, false);
    //     if (_local_10.y > _local_3)
    //     {
    //         _local_3 = _local_10.y;
    //     }
    //     return _local_3;
    // }

    // private _Str_18019(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_7:Array;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5: number = k.width;
    //     var _local_6:Point = this._Str_4606(k, _arg_2, _local_5, false);
    //     _local_5 = _local_6.x;
    //     if (_local_6.y > _local_3)
    //     {
    //         _local_3 = _local_6.y;
    //     }
    //     _local_4 = (_arg_2[0] as BitmapData);
    //     if (_local_4 != null)
    //     {
    //         _local_7 = [_local_4];
    //         while (_local_5 >= 0)
    //         {
    //             _local_6 = this._Str_4606(k, _local_7, _local_5, false);
    //             _local_5 = _local_6.x;
    //             if (_local_6.y > _local_3)
    //             {
    //                 _local_3 = _local_6.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    // private _Str_16099(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_7:Array;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5: number;
    //     var _local_6:Point = this._Str_4606(k, _arg_2, _local_5, true);
    //     _local_5 = _local_6.x;
    //     if (_local_6.y > _local_3)
    //     {
    //         _local_3 = _local_6.y;
    //     }
    //     _local_4 = (_arg_2[(_arg_2.length - 1)] as BitmapData);
    //     if (_local_4 != null)
    //     {
    //         _local_7 = [_local_4];
    //         while (_local_5 < k.width)
    //         {
    //             _local_6 = this._Str_4606(k, _local_7, _local_5, true);
    //             _local_5 = _local_6.x;
    //             if (_local_6.y > _local_3)
    //             {
    //                 _local_3 = _local_6.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    // private _Str_25678(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_6:Array;
    //     var _local_7:Point;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5: number;
    //     while (_local_5 < k.width)
    //     {
    //         _local_4 = (_arg_2[_Str_12526(_arg_2.length)] as BitmapData);
    //         if (_local_4 != null)
    //         {
    //             _local_6 = [_local_4];
    //             _local_7 = this._Str_4606(k, _local_6, _local_5, true);
    //             _local_5 = _local_7.x;
    //             if (_local_7.y > _local_3)
    //             {
    //                 _local_3 = _local_7.y;
    //             }
    //         }
    //         else
    //         {
    //             return _local_3;
    //         }
    //     }
    //     return _local_3;
    // }

    public _Str_23721(k: number): PlaneMaterialCellColumn[]
    {
        if(this._repeatMode === PlaneMaterialCellMatrix._Str_9127)
        {
            const columns: PlaneMaterialCellColumn[] = [];

            let columnIndex = 0;

            while(columnIndex < k)
            {
                const column = this._columns[PlaneMaterialCellMatrix._Str_12526(this._columns.length)];

                if(column)
                {
                    columns.push(column);

                    if(column.width > 1) columnIndex += column.width;
                    else break;
                }
            }

            return columns;
        }

        return this._columns;
    }
}