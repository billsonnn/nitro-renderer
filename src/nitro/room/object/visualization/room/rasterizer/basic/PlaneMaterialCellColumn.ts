import { Graphics } from '@pixi/graphics';
import { NitroRenderTexture } from '../../../../../../../core';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { PlaneMaterialCell } from './PlaneMaterialCell';

export class PlaneMaterialCellColumn
{
    public static REPEAT_MODE_NONE: number = 0;
    public static REPEAT_MODE_ALL: number = 1;
    public static REPEAT_MODE_BORDERS: number = 2;
    public static REPEAT_MODE_CENTER: number = 3;
    public static REPEAT_MODE_FIRST: number = 4;
    public static REPEAT_MODE_LAST: number = 5;

    private _cells: PlaneMaterialCell[];
    private _repeatMode: number;
    private _width: number;
    private _cachedTexture: NitroRenderTexture;
    private _cachedBitmapData: Graphics;
    private _cachedBitmapNormal: Vector3d;
    private _cachedBitmapDataOffsetX: number;
    private _cachedBitmapDataOffsetY: number;
    private _isCached: boolean;
    private _isStatic: boolean;

    constructor(width: number, cells: PlaneMaterialCell[], repeatMode: number = 1)
    {
        this._cells = [];
        this._repeatMode = repeatMode;
        this._width = (width < 1) ? 1 : width;
        this._cachedBitmapData = null;
        this._cachedBitmapNormal = null;
        this._cachedBitmapDataOffsetX = 0;
        this._cachedBitmapDataOffsetY = 0;
        this._isCached = false;
        this._isStatic = true;

        if(cells && cells.length)
        {
            let cellIndex = 0;

            while(cellIndex < cells.length)
            {
                const cell = cells[cellIndex];

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

    public isRepeated(): boolean
    {
        return !(this._repeatMode === PlaneMaterialCellColumn.REPEAT_MODE_NONE);
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

    public clearCache(): void
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

                cell.clearCache();
            }
        }

        this._isCached = false;
    }

    public render(height: number, normal: IVector3D, offsetX: number, offsetY: number): Graphics
    {
        let ht = 0;

        if(this._repeatMode == PlaneMaterialCellColumn.REPEAT_MODE_NONE)
        {
            ht = this.getCellsHeight(this._cells, normal);
            height = ht;
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
            case PlaneMaterialCellColumn.REPEAT_MODE_NONE:
                this.renderRepeatNone(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_BORDERS:
                console.log('REPEAT_MODE_BORDERS');
                //     this.renderRepeatBorders(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_CENTER:
                console.log('REPEAT_MODE_CENTER');
                //     this.renderRepeatCenter(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_FIRST:
                console.log('REPEAT_MODE_FIRST');
                //     this.renderRepeatFirst(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_LAST:
                console.log('REPEAT_MODE_LAST');
                //     this.renderRepeatLast(normal);
                break;
            default:
                this.renderRepeatAll(normal, offsetX, offsetY);
                break;
        }

        return this._cachedBitmapData;
    }

    private getCellsHeight(cells: PlaneMaterialCell[], normal: IVector3D): number
    {
        if(!cells || !cells.length) return 0;

        let height = 0;
        let cellIterator = 0;

        while(cellIterator < cells.length)
        {
            const cell = cells[cellIterator];

            if(cell) height += cell.getHeight(normal);

            cellIterator++;
        }

        return height;
    }

    private renderCells(cells: PlaneMaterialCell[], index: number, flag: boolean, normal: IVector3D, offsetX: number = 0, offsetY: number = 0): number
    {
        if(((!cells || !cells.length) || !this._cachedBitmapData)) return index;

        let cellIndex = 0;

        while(cellIndex < cells.length)
        {
            let cell: PlaneMaterialCell = null;

            if(flag)
            {
                cell = cells[cellIndex];
            }
            else
            {
                cell = cells[((cells.length - 1) - cellIndex)];
            }

            if(cell)
            {
                const graphic = cell.render(normal, offsetX, offsetY);

                if(graphic)
                {
                    if(!flag) index -= graphic.height;

                    graphic.y = index;

                    this._cachedBitmapData.addChild(graphic);

                    if(flag) index = (index + graphic.height);

                    if(((flag) && (index >= this._cachedBitmapData.height)) || ((!(flag)) && (index <= 0))) return index;
                }
            }

            cellIndex++;
        }

        return index;
    }

    private renderRepeatNone(normal: IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        this.renderCells(this._cells, 0, true, normal);
    }

    private renderRepeatAll(normal: IVector3D, offsetX: number, offsetY: number): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        let index = 0;

        while(index < this._cachedBitmapData.height)
        {
            index = this.renderCells(this._cells, index, true, normal, offsetX, offsetY);

            if(!index) return;
        }
    }

    // private renderRepeatBorders(k:IVector3D): void
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
    //             _local_6 = _local_2.getHeight(k);
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
    //             _local_6 = _local_2.getHeight(k);
    //             if (_local_6 > 0)
    //             {
    //                 _local_5 = (_local_5 + _local_6);
    //                 _local_4.push(_local_2);
    //             }
    //         }
    //     }
    //     var _local_8:* = ((this._cachedBitmapData.height - _local_5) >> 1);
    //     var _local_9: number = this.renderCells(_local_4, _local_8, true, k);
    //     _local_2 = (this._cells[0] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_8 >= 0)
    //         {
    //             _local_8 = this.renderCells(_local_4, _local_8, false, k);
    //         }
    //     }
    //     _local_2 = (this._cells[(this._cells.length - 1)] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_9 < this._cachedBitmapData.height)
    //         {
    //             _local_9 = this.renderCells(_local_4, _local_9, true, k);
    //         }
    //     }
    // }

    // private renderRepeatCenter(k:IVector3D): void
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
    //             _local_8 = _local_2.getHeight(k);
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
    //             _local_8 = _local_2.getHeight(k);
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
    //             _local_8 = _local_2.getHeight(k);
    //             if (_local_8 > 0)
    //             {
    //                 _local_13 = (this._cachedBitmapData.height - (_local_6 + _local_7));
    //                 _local_14 = (Math.ceil((_local_13 / _local_8)) * _local_8);
    //                 _local_11 = (_local_6 - ((_local_14 - _local_13) >> 1));
    //                 _local_15 = (_local_11 + _local_14);
    //                 _local_16 = [_local_2];
    //                 while (_local_11 < _local_15)
    //                 {
    //                     _local_11 = this.renderCells(_local_16, _local_11, true, k);
    //                 }
    //             }
    //         }
    //     }
    //     _local_11 = 0;
    //     this.renderCells(_local_4, _local_11, true, k);
    //     this.renderCells(_local_5, _local_12, false, k);
    // }

    // private renderRepeatFirst(k:IVector3D): void
    // {
    //     var _local_4:Array;
    //     if (((this._cells.length == 0) || (this._cachedBitmapData == null)))
    //     {
    //         return;
    //     }
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3: number = this._cachedBitmapData.height;
    //     _local_3 = this.renderCells(this._cells, _local_3, false, k);
    //     _local_2 = (this._cells[0] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_3 >= 0)
    //         {
    //             _local_3 = this.renderCells(_local_4, _local_3, false, k);
    //         }
    //     }
    // }

    // private renderRepeatLast(k: IVector3D): void
    // {
    //     if(!this._cells.length || !this._cachedBitmapData) return;


    //     var _local_4:Array;
    //     var _local_2:PlaneMaterialCell;
    //     var _local_3: number;
    //     _local_3 = this.renderCells(this._cells, _local_3, true, k);
    //     _local_2 = (this._cells[(this._cells.length - 1)] as PlaneMaterialCell);
    //     if (_local_2 != null)
    //     {
    //         _local_4 = [_local_2];
    //         while (_local_3 < this._cachedBitmapData.height)
    //         {
    //             _local_3 = this.renderCells(_local_4, _local_3, true, k);
    //         }
    //     }
    // }

    public getCells(): PlaneMaterialCell[]
    {
        return this._cells;
    }
}
