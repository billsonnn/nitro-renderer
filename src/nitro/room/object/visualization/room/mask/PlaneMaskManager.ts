import { RenderTexture } from '@pixi/core';
import { Matrix, Point } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { IAssetPlaneMaskData, IAssetPlaneTextureBitmap, IGraphicAssetCollection, IVector3D } from '../../../../../../api';
import { PixiApplicationProxy } from '../../../../../../pixi-proxy';
import { PlaneMask } from './PlaneMask';
import { PlaneMaskVisualization } from './PlaneMaskVisualization';

export class PlaneMaskManager
{
    private _assetCollection: IGraphicAssetCollection;
    private _masks: Map<string, PlaneMask>;
    private _data: IAssetPlaneMaskData;

    constructor()
    {
        this._assetCollection = null;
        this._masks = new Map();
        this._data = null;
    }

    public get data(): IAssetPlaneMaskData
    {
        return this._data;
    }

    public dispose(): void
    {
        this._assetCollection = null;
        this._data = null;

        if(this._masks && this._masks.size)
        {
            for(const mask of this._masks.values())
            {
                if(!mask) continue;

                mask.dispose();
            }

            this._masks.clear();
        }
    }

    public initialize(k: IAssetPlaneMaskData): void
    {
        this._data = k;
    }

    public initializeAssetCollection(k: IGraphicAssetCollection): void
    {
        if(!this.data) return;

        this._assetCollection = k;

        this.parseMasks(this.data, k);
    }

    private parseMasks(maskData: IAssetPlaneMaskData, _arg_2: IGraphicAssetCollection): void
    {
        if(!maskData || !_arg_2) return;

        if(maskData.masks && maskData.masks.length)
        {
            let index = 0;

            while(index < maskData.masks.length)
            {
                const mask = maskData.masks[index];

                if(mask)
                {
                    const id = mask.id;
                    const existing = this._masks.get(id);

                    if(existing) continue;

                    const newMask = new PlaneMask();

                    if(mask.visualizations && mask.visualizations.length)
                    {
                        let visualIndex = 0;

                        while(visualIndex < mask.visualizations.length)
                        {
                            const visualization = mask.visualizations[visualIndex];

                            if(visualization)
                            {
                                const size = visualization.size;
                                const maskVisualization = newMask.createMaskVisualization(size);

                                if(maskVisualization)
                                {
                                    const assetName = this.parseMaskBitmaps(visualization.bitmaps, maskVisualization, _arg_2);

                                    newMask.setAssetName(size, assetName);
                                }
                            }

                            visualIndex++;
                        }
                    }

                    this._masks.set(id, newMask);
                }

                index++;
            }
        }
    }

    private parseMaskBitmaps(bitmaps: IAssetPlaneTextureBitmap[], maskVisualization: PlaneMaskVisualization, assetCollection: IGraphicAssetCollection): string
    {
        if(!bitmaps || !bitmaps.length) return null;

        let graphicName: string = null;

        for(const bitmap of bitmaps)
        {
            if(!bitmap) continue;

            const assetName = bitmap.assetName;
            const asset = assetCollection.getAsset(assetName);

            if(!asset) continue;

            let normalMinX = PlaneMaskVisualization.MIN_NORMAL_COORDINATE_VALUE;
            let normalMaxX = PlaneMaskVisualization.MAX_NORMAL_COORDINATE_VALUE;
            let normalMinY = PlaneMaskVisualization.MIN_NORMAL_COORDINATE_VALUE;
            let normalMaxY = PlaneMaskVisualization.MAX_NORMAL_COORDINATE_VALUE;

            if(bitmap.normalMinX !== undefined) normalMinX = bitmap.normalMinX;
            if(bitmap.normalMaxX !== undefined) normalMaxX = bitmap.normalMaxX;
            if(bitmap.normalMinY !== undefined) normalMinY = bitmap.normalMinY;
            if(bitmap.normalMaxY !== undefined) normalMaxY = bitmap.normalMaxY;

            if(!asset.flipH) graphicName = assetName;

            maskVisualization.addBitmap(asset, normalMinX, normalMaxX, normalMinY, normalMaxY);
        }

        return graphicName;
    }

    public updateMask(canvas: RenderTexture, type: string, scale: number, normal: IVector3D, posX: number, posY: number): boolean
    {
        const mask = this._masks.get(type);

        if(!mask) return true;

        const asset = mask.getGraphicAsset(scale, normal);

        if(!asset) return true;

        const texture = asset.texture;

        if(!texture) return true;

        const point = new Point((posX + asset.offsetX), (posY + asset.offsetY));

        const matrix = new Matrix();

        let xScale = 1;
        let ySkew = 1;
        let xSkew = 0;
        let yScale = 0;
        let tx = (point.x + xSkew);
        let ty = (point.y + yScale);

        if(asset.flipH)
        {
            xScale = -1;
            xSkew = texture.width;

            tx = ((point.x + xSkew) - texture.width);
        }

        if(asset.flipV)
        {
            ySkew = -1;
            yScale = texture.height;

            ty = ((point.y + yScale) - texture.height);
        }

        matrix.scale(xScale, ySkew);
        matrix.translate(tx, ty);

        PixiApplicationProxy.instance.renderer.render(new Sprite(texture), {
            renderTexture: canvas,
            clear: false,
            transform: matrix
        });

        return true;
    }

    public getMask(k: string): PlaneMask
    {
        if(!this._masks || !this._masks.size) return null;

        return this._masks.get(k) || null;
    }
}
