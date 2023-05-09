import { RenderTexture } from '@pixi/core';
import { Point, Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { IVector3D, NitroLogger, Vector3d } from '../../../../../../../api';
import { PlaneTextureCache, TextureUtils } from '../../../../../../../pixi-proxy';
import { Randomizer } from '../../utils';
import { PlaneMaterialCell } from './PlaneMaterialCell';
import { PlaneMaterialCellColumn } from './PlaneMaterialCellColumn';

export class PlaneMaterialCellMatrix
{
    public static REPEAT_MODE_ALL: number = 1;
    public static REPEAT_MODE_BORDERS: number = 2;
    public static REPEAT_MODE_CENTER: number = 3;
    public static REPEAT_MODE_FIRST: number = 4;
    public static REPEAT_MODE_LAST: number = 5;
    public static REPEAT_MODE_RANDOM: number = 6;
    public static REPEAT_MODE_DEFAULT: number = PlaneMaterialCellMatrix.REPEAT_MODE_ALL;//1
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;
    public static ALIGN_TOP: number = 1;
    public static ALIGN_BOTTOM: number = 2;
    public static ALIGN_DEFAULT: number = PlaneMaterialCellMatrix.ALIGN_TOP;//1

    private _columns: PlaneMaterialCellColumn[];
    private _repeatMode: number = 1;
    private _align: number = 1;
    private _cachedBitmapData: RenderTexture;
    private _cachedBitmapNormal: Vector3d = null;
    private _cachedBitmapHeight: number = 0;
    private _isCached: boolean = false;
    private _isStatic: boolean = true;
    private _normalMinX: number = -1;
    private _normalMaxX: number = 1;
    private _normalMinY: number = -1;
    private _normalMaxY: number = 1;

    constructor(totalColumns: number, repeatMode: number = 1, align: number = 1, normalMinX: number = -1, normalMaxX: number = 1, normalMinY: number = -1, normalMaxY: number = 1)
    {
        this._columns = [];

        if(totalColumns < 1) totalColumns = 1;

        let _local_8 = 0;

        while(_local_8 < totalColumns)
        {
            this._columns.push(null);

            _local_8++;
        }

        this._repeatMode = repeatMode;
        this._align = align;
        this._normalMinX = normalMinX;
        this._normalMaxX = normalMaxX;
        this._normalMinY = normalMinY;
        this._normalMaxY = normalMaxY;

        if(this._repeatMode === PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM) this._isStatic = false;
    }

    private static nextRandomColumnIndex(totalColumns: number): number
    {
        const _local_2 = Randomizer.getValues(1, 0, (totalColumns * 17631));

        return _local_2[0] % totalColumns;
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

    public isBottomAligned(): boolean
    {
        return this._align === PlaneMaterialCellMatrix.ALIGN_BOTTOM;
    }

    public get isStatic(): boolean
    {
        return this._isStatic;
    }

    public dispose(): void
    {
        if(this._cachedBitmapNormal) this._cachedBitmapNormal = null;
    }

    public clearCache(): void
    {
        if(!this._isCached) return;

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

                column.clearCache();
            }
        }

        this._isCached = false;
    }

    public createColumn(index: number, width: number, cells: PlaneMaterialCell[], repeatMode: number = 1): boolean
    {
        if((index < 0) || (index >= this._columns.length)) return false;

        const newColumn = new PlaneMaterialCellColumn(width, cells, repeatMode);
        const oldColumn = this._columns[index];

        if(oldColumn) oldColumn.dispose();

        this._columns[index] = newColumn;

        if(newColumn && !newColumn.isStatic) this._isStatic = false;

        return true;
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, topAlign: boolean): RenderTexture
    {
        if(width < 1) width = 1;

        if(height < 1) height = 1;

        if(!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if(this.isStatic)
        {
            if(this._cachedBitmapData)
            {
                if(this._cachedBitmapData.baseTexture && (this._cachedBitmapData.width === width) && (this._cachedBitmapData.height === height) && Vector3d.isEqual(this._cachedBitmapNormal, normal))
                {
                    if(canvas)
                    {
                        this.copyCachedBitmapOnCanvas(canvas, this._cachedBitmapHeight, offsetY, topAlign);

                        return canvas;
                    }

                    return this._cachedBitmapData;
                }

                this._cachedBitmapData = null;
            }
        }
        else
        {
            this._cachedBitmapData = null;
        }

        this._isCached = true;
        this._cachedBitmapNormal.assign(normal);

        if(!useTexture)
        {
            this._cachedBitmapHeight = height;

            if(!this._cachedBitmapData)
            {
                this._cachedBitmapData = textureCache.createAndFillRenderTexture(width, height, `${ planeId }:matrix`);
            }
            else
            {
                textureCache.clearAndFillRenderTexture(this._cachedBitmapData);
            }


            return this._cachedBitmapData;
        }

        if(!this._cachedBitmapData)
        {
            this._cachedBitmapHeight = height;

            this._cachedBitmapData = textureCache.createRenderTexture(width, height, `${ planeId }:matrix`);

            textureCache.clearRenderTexture(this._cachedBitmapData);
        }

        const columns: RenderTexture[] = [];

        let columnIndex = 0;

        while(columnIndex < this._columns.length)
        {
            const column = this._columns[columnIndex];

            if(column)
            {
                const columnBitmapData = column.render(planeId, textureCache, height, normal, offsetX, offsetY);

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
            case PlaneMaterialCellMatrix.REPEAT_MODE_BORDERS:
                NitroLogger.log('REPEAT_MODE_BORDERS');
                //     maxColumnHeight = this.renderRepeatBorders(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_CENTER:
                NitroLogger.log('REPEAT_MODE_CENTER');
                //     maxColumnHeight = this.renderRepeatCenter(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_FIRST:
                NitroLogger.log('REPEAT_MODE_FIRST');
                //     maxColumnHeight = this.renderRepeatFirst(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_LAST:
                NitroLogger.log('REPEAT_MODE_LAST');
                //     maxColumnHeight = this.renderRepeatLast(this._cachedBitmapData, columns);
                break;
            case PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM:
                maxColumnHeight = this.renderRepeatRandom(this._cachedBitmapData, columns);
                break;
            default:
                maxColumnHeight = this.renderRepeatAll(this._cachedBitmapData, columns);
                break;
        }

        this._cachedBitmapHeight = maxColumnHeight;

        if(canvas)
        {
            this.copyCachedBitmapOnCanvas(canvas, maxColumnHeight, offsetY, topAlign);

            return canvas;
        }

        return this._cachedBitmapData;
    }

    private copyCachedBitmapOnCanvas(canvas: RenderTexture, height: number, offsetY: number, topAlign: boolean): void
    {
        if(!canvas || !this._cachedBitmapData || (canvas === this._cachedBitmapData)) return;

        if(!topAlign) offsetY = ((canvas.height - height) - offsetY);

        let bounds: Rectangle = null;

        if(this._align === PlaneMaterialCellMatrix.ALIGN_TOP)
        {
            bounds = new Rectangle(0, 0, this._cachedBitmapData.width, this._cachedBitmapHeight);
        }
        else
        {
            bounds = new Rectangle(0, (this._cachedBitmapData.height - this._cachedBitmapHeight), this._cachedBitmapData.width, this._cachedBitmapHeight);
        }

        const texture = new RenderTexture(this._cachedBitmapData.baseTexture, bounds);
        const sprite = new Sprite(texture);

        sprite.position.set(0, offsetY);

        TextureUtils.writeToRenderTexture(sprite, canvas, false);
    }

    private getColumnsWidth(columns: RenderTexture[]): number
    {
        if(!columns || !columns.length) return 0;

        let width = 0;

        for(const texture of columns)
        {
            if(!texture) continue;

            width += texture.width;
        }

        return width;
    }

    private renderColumns(canvas: RenderTexture, columns: RenderTexture[], x: number, flag: boolean): Point
    {
        if(!canvas || !columns || !columns.length) return new Point(x, 0);

        let height = 0;
        let i = 0;

        while(i < columns.length)
        {
            const column = flag ? columns[i] : columns[((columns.length - 1) - i)];

            if(column)
            {
                if(!flag) x = (x - column.width);

                let y = 0;

                if(this._align == PlaneMaterialCellMatrix.ALIGN_BOTTOM) y = (canvas.height - column.height);

                const sprite = new Sprite(column);

                sprite.position.set(x, y);

                TextureUtils.writeToRenderTexture(sprite, canvas, false);

                if(column.height > height) height = column.height;

                if(flag) x = (x + column.width);

                if((flag && (x >= canvas.width)) || (!flag && (x <= 0))) return new Point(x, height);
            }

            i++;
        }

        return new Point(x, height);
    }

    private renderRepeatAll(canvas: RenderTexture, columns: RenderTexture[]): number
    {
        if(!canvas || !columns || !columns.length) return 0;

        const totalWidth: number = this.getColumnsWidth(columns);

        let x = 0;
        let y = 0;

        while(x < canvas.width)
        {
            const point = this.renderColumns(canvas, columns, x, true);

            x = point.x;

            if(point.y > y) y = point.y;

            if(!point.x) return y;
        }

        return y;
    }

    // private renderRepeatBorders(k:BitmapData, _arg_2:Array): number
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
    //     _local_9 = this.renderColumns(k, _local_5, _local_8, true);
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
    //             _local_9 = this.renderColumns(k, _local_5, _local_8, false);
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
    //             _local_9 = this.renderColumns(k, _local_5, _local_10, true);
    //             _local_10 = _local_9.x;
    //             if (_local_9.y > _local_3)
    //             {
    //                 _local_3 = _local_9.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    // private renderRepeatCenter(k:BitmapData, _arg_2:Array): number
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
    //                 _local_10 = this.renderColumns(k, _local_18, _local_12, true);
    //                 _local_12 = _local_10.x;
    //                 if (_local_10.y > _local_3)
    //                 {
    //                     _local_3 = _local_10.y;
    //                 }
    //             }
    //         }
    //     }
    //     _local_12 = 0;
    //     _local_10 = this.renderColumns(k, _local_5, _local_12, true);
    //     if (_local_10.y > _local_3)
    //     {
    //         _local_3 = _local_10.y;
    //     }
    //     _local_10 = this.renderColumns(k, _local_6, _local_13, false);
    //     if (_local_10.y > _local_3)
    //     {
    //         _local_3 = _local_10.y;
    //     }
    //     return _local_3;
    // }

    // private renderRepeatFirst(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_7:Array;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5: number = k.width;
    //     var _local_6:Point = this.renderColumns(k, _arg_2, _local_5, false);
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
    //             _local_6 = this.renderColumns(k, _local_7, _local_5, false);
    //             _local_5 = _local_6.x;
    //             if (_local_6.y > _local_3)
    //             {
    //                 _local_3 = _local_6.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    // private renderRepeatLast(k:BitmapData, _arg_2:Array): number
    // {
    //     var _local_7:Array;
    //     if ((((_arg_2 == null) || (_arg_2.length == 0)) || (k == null)))
    //     {
    //         return 0;
    //     }
    //     var _local_3: number;
    //     var _local_4:BitmapData;
    //     var _local_5: number;
    //     var _local_6:Point = this.renderColumns(k, _arg_2, _local_5, true);
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
    //             _local_6 = this.renderColumns(k, _local_7, _local_5, true);
    //             _local_5 = _local_6.x;
    //             if (_local_6.y > _local_3)
    //             {
    //                 _local_3 = _local_6.y;
    //             }
    //         }
    //     }
    //     return _local_3;
    // }

    private renderRepeatRandom(canvas: RenderTexture, columns: RenderTexture[]): number
    {
        if(!canvas || !columns || !columns.length) return 0;

        let height = 0;
        let width = 0;

        while(width < canvas.width)
        {
            const column = columns[PlaneMaterialCellMatrix.nextRandomColumnIndex(columns.length)];

            if(column != null)
            {
                const point = this.renderColumns(canvas, [ column ], width, true);

                width = point.x;

                if(point.y > height)
                {
                    height = point.y;
                }
            }
            else
            {
                return height;

            }
        }

        return height;
    }

    public getColumns(width: number): PlaneMaterialCellColumn[]
    {
        if(this._repeatMode === PlaneMaterialCellMatrix.REPEAT_MODE_RANDOM)
        {
            const columns: PlaneMaterialCellColumn[] = [];

            let columnIndex = 0;

            while(columnIndex < width)
            {
                const column = this._columns[PlaneMaterialCellMatrix.nextRandomColumnIndex(this._columns.length)];

                if(column)
                {
                    columns.push(column);

                    if(column.width > 1) columnIndex += column.width;
                    else break;
                }
                else break;
            }

            return columns;
        }

        return this._columns;
    }
}
