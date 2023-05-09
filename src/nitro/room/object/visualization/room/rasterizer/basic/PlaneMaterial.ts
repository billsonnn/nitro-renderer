import { RenderTexture } from '@pixi/core';
import { IVector3D } from '../../../../../../../api';
import { PlaneTextureCache } from '../../../../../../../pixi-proxy';
import { PlaneMaterialCellMatrix } from './PlaneMaterialCellMatrix';

export class PlaneMaterial
{
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _planeMaterialItems: PlaneMaterialCellMatrix[];
    private _isCached: boolean;

    constructor()
    {
        this._planeMaterialItems = [];
        this._isCached = false;
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

    public clearCache(): void
    {
        if(!this._isCached) return;

        if(this._planeMaterialItems && this._planeMaterialItems.length)
        {
            for(const item of this._planeMaterialItems)
            {
                if(!item) continue;

                item.clearCache();
            }
        }

        this._isCached = false;
    }

    public addMaterialCellMatrix(totalColumns: number, repeatMode: number, align: number, normalMinX: number = -1, normalMaxX: number = 1, normalMinY: number = -1, normalMaxY: number = 1): PlaneMaterialCellMatrix
    {
        const cellMatrix = new PlaneMaterialCellMatrix(totalColumns, repeatMode, align, normalMinX, normalMaxX, normalMinY, normalMaxY);

        this._planeMaterialItems.push(cellMatrix);

        return cellMatrix;
    }

    public getMaterialCellMatrix(normal: IVector3D): PlaneMaterialCellMatrix
    {
        if(!normal) return null;

        if(this._planeMaterialItems && this._planeMaterialItems.length)
        {
            for(const item of this._planeMaterialItems)
            {
                if(!item) continue;

                if((((normal.x >= item.normalMinX) && (normal.x <= item.normalMaxX)) && (normal.y >= item.normalMinY)) && (normal.y <= item.normalMaxY)) return item;
            }
        }

        return null;
    }

    public render(planeId: string, textureCache: PlaneTextureCache, canvas: RenderTexture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number, topAlign: boolean): RenderTexture
    {
        if(width < 1) width = 1;

        if(height < 1) height = 1;

        const cellMatrix = this.getMaterialCellMatrix(normal);

        if(!cellMatrix) return null;

        this._isCached = true;

        return cellMatrix.render(planeId, textureCache, canvas, width, height, normal, useTexture, offsetX, offsetY, topAlign);
    }
}
