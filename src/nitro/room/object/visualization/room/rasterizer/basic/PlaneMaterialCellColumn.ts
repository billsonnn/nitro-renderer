import { RenderTexture } from '@pixi/core';
import { IVector3D, Vector3d } from '../../../../../../../api';
import { PlaneTextureCache, TextureUtils } from '../../../../../../../pixi-proxy';
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
    private _cachedBitmapData: RenderTexture;
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

        this._cachedBitmapData = null;

        if(this._cachedBitmapNormal) this._cachedBitmapNormal = null;
    }

    public clearCache(): void
    {
        if(!this._isCached) return;

        if(this._cachedBitmapData) this._cachedBitmapData = null;

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

    public render(planeId: string, textureCache: PlaneTextureCache, height: number, normal: IVector3D, offsetX: number, offsetY: number): RenderTexture
    {
        if(this._repeatMode === PlaneMaterialCellColumn.REPEAT_MODE_NONE) height = this.getCellsHeight(this._cells, normal);

        if(!this._cachedBitmapNormal) this._cachedBitmapNormal = new Vector3d();

        if(this.isStatic)
        {
            if(this._cachedBitmapData)
            {
                if((this._cachedBitmapData.height === height) && Vector3d.isEqual(this._cachedBitmapNormal, normal) && (this._cachedBitmapDataOffsetX === offsetX) && (this._cachedBitmapDataOffsetY === offsetY))
                {
                    return this._cachedBitmapData;
                }
                else
                {
                    this._cachedBitmapData = null;
                }
            }
        }
        else
        {
            this._cachedBitmapData = null;
        }

        this._isCached = true;

        if(!this._cachedBitmapData)
        {
            this._cachedBitmapData = textureCache.createRenderTexture(this._width, height, `${ planeId }:column`);
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
                this.renderRepeatBorders(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_CENTER:
                this.renderRepeatCenter(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_FIRST:
                this.renderRepeatFirst(normal);
                break;
            case PlaneMaterialCellColumn.REPEAT_MODE_LAST:
                this.renderRepeatLast(normal);
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

                    TextureUtils.writeToRenderTexture(graphic, this._cachedBitmapData, false);

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

    private renderRepeatBorders(k:IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        const _local_4: PlaneMaterialCell[] = [];

        let _local_5 = 0;
        let _local_7 = 1;

        while(_local_7 < (this._cells.length - 1))
        {
            const cell = (this._cells[_local_7] as PlaneMaterialCell);

            if(cell)
            {
                const height = cell.getHeight(k);

                if(height > 0)
                {
                    _local_5 = (_local_5 + height);

                    _local_4.push(cell);
                }
            }

            _local_7++;
        }

        if(this._cells.length == 1)
        {
            const cell = this._cells[0];

            if(cell)
            {
                const height = cell.getHeight(k);

                if(height > 0)
                {
                    _local_5 = (_local_5 + height);

                    _local_4.push(cell);
                }
            }
        }

        let _local_8 = ((this._cachedBitmapData.height - _local_5) >> 1);
        let index: number = this.renderCells(_local_4, _local_8, true, k);

        let cell = this._cells[0];

        if(cell)
        {
            const cells = [cell];

            while(_local_8 >= 0) _local_8 = this.renderCells(cells, _local_8, false, k);
        }

        cell = this._cells[(this._cells.length - 1)];

        if(cell)
        {
            const cells = [cell];

            while(index < this._cachedBitmapData.height) index = this.renderCells(cells, index, true, k);
        }
    }

    private renderRepeatCenter(k:IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        const _local_4: PlaneMaterialCell[] = [];
        const _local_5: PlaneMaterialCell[] = [];

        let _local_6 = 0;
        let _local_7 = 0;

        let _local_9 = 0;

        while(_local_9 < (this._cells.length >> 1))
        {
            const cell = this._cells[_local_9];

            if(cell)
            {
                const height = cell.getHeight(k);

                if(height > 0)
                {
                    _local_6 = (_local_6 + height);

                    _local_4.push(cell);
                }
            }

            _local_9++;
        }

        _local_9 = ((this._cells.length >> 1) + 1);

        while(_local_9 < this._cells.length)
        {
            const cell = this._cells[_local_9];

            if(cell)
            {
                const height = cell.getHeight(k);

                if(height > 0)
                {
                    _local_7 = (_local_7 + height);

                    _local_5.push(cell);
                }
            }

            _local_9++;
        }

        let _local_10 = 0;
        let _local_11: number;
        let _local_12 = this._cachedBitmapData.height;

        if((_local_6 + _local_7) > this._cachedBitmapData.height)
        {
            _local_10 = ((_local_6 + _local_7) - this._cachedBitmapData.height);
            _local_11 = (_local_11 - (_local_10 >> 1));
            _local_12 = (_local_12 + (_local_10 - (_local_10 >> 1)));
        }

        if(_local_10 == 0)
        {
            const cell = this._cells[(this._cells.length >> 1)];

            if(cell)
            {
                const height = cell.getHeight(k);

                if(height > 0)
                {
                    const _local_13 = (this._cachedBitmapData.height - (_local_6 + _local_7));
                    const _local_14 = (Math.ceil((_local_13 / height)) * height);

                    let _local_11 = (_local_6 - ((_local_14 - _local_13) >> 1));

                    const _local_15 = (_local_11 + _local_14);
                    const _local_16 = [cell];

                    while(_local_11 < _local_15) _local_11 = this.renderCells(_local_16, _local_11, true, k);
                }
            }
        }

        this.renderCells(_local_4, 0, true, k);
        this.renderCells(_local_5, _local_12, false, k);
    }

    private renderRepeatFirst(k:IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        let index = this.renderCells(this._cells, this._cachedBitmapData.height, false, k);

        const cell = (this._cells[0] as PlaneMaterialCell);

        if(!cell) return;

        const cells = [ cell ];

        while(index >= 0) index = this.renderCells(cells, index, false, k);
    }

    private renderRepeatLast(normal: IVector3D): void
    {
        if(!this._cells.length || !this._cachedBitmapData) return;

        let index = this.renderCells(this._cells, 0, true, normal);

        const cell = (this._cells[(this._cells.length - 1)] as PlaneMaterialCell);

        if(!cell) return;

        const cells = [cell];

        while(index < this._cachedBitmapData.height)
        {
            index = this.renderCells(cells, index, true, normal);
        }
    }

    public getCells(): PlaneMaterialCell[]
    {
        return this._cells;
    }
}
