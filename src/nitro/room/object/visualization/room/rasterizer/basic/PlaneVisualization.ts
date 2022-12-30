import { RenderTexture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { IDisposable, IGraphicAssetCollection, IRoomGeometry, IVector3D, Vector3d } from '../../../../../../../api';
import { TextureUtils } from '../../../../../../../pixi-proxy';
import { PlaneVisualizationAnimationLayer } from '../animated';
import { PlaneMaterial } from './PlaneMaterial';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

export class PlaneVisualization
{
    private _layers: IDisposable[];
    private _geometry: IRoomGeometry;
    private _cachedBitmapData: RenderTexture;
    private _cachedBitmapNormal: Vector3d;
    private _isCached: boolean;
    private _hasAnimationLayers: boolean;
    private _texturePool: Map<string, RenderTexture>;

    constructor(size: number, totalLayers: number, geometry: IRoomGeometry)
    {
        this._layers = [];
        this._geometry = geometry;
        this._cachedBitmapData = null;
        this._cachedBitmapNormal = new Vector3d();
        this._isCached = false;
        this._hasAnimationLayers = false;
        this._texturePool = new Map();

        if(totalLayers < 0) totalLayers = 0;

        let index = 0;

        while(index < totalLayers)
        {
            this._layers.push(null);

            index++;
        }
    }

    public get geometry(): IRoomGeometry
    {
        return this._geometry;
    }

    public get hasAnimationLayers(): boolean
    {
        return this._hasAnimationLayers;
    }

    public dispose(): void
    {
        if(this._layers && this._layers.length)
        {
            for(const layer of this._layers)
            {
                if(!layer) continue;

                layer.dispose();
            }

            this._layers = null;
        }

        this._geometry = null;

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
            this._cachedBitmapNormal.assign(new Vector3d());
        }

        if(this._layers && this._layers.length)
        {
            for(const layer of this._layers)
            {
                if(!layer) continue;

                const planeLayer = layer as PlaneVisualizationLayer;

                planeLayer.clearCache();
            }
        }

        if(this._texturePool && this._texturePool.size)
        {
            this._texturePool.forEach(texture => texture.destroy(true));

            this._texturePool.clear();
        }

        this._isCached = false;
    }

    public setLayer(layerId: number, material: PlaneMaterial, color: number, align: number, offset: number = 0): boolean
    {
        if((layerId < 0) || (layerId > this._layers.length)) return false;

        let layer = this._layers[layerId];

        if(layer) layer.dispose();

        layer = new PlaneVisualizationLayer(material, color, align, offset);

        this._layers[layerId] = layer;

        return true;
    }

    public setAnimationLayer(layerId: number, animationItems: any, collection: IGraphicAssetCollection): boolean
    {
        if((layerId < 0) || (layerId > this._layers.length)) return false;

        let layer = this._layers[layerId] as IDisposable;

        if(layer) layer.dispose();

        layer = new PlaneVisualizationAnimationLayer(animationItems, collection);

        this._layers[layerId] = layer;
        this._hasAnimationLayers = true;

        return true;
    }

    public getLayers(): PlaneVisualizationLayer[]
    {
        return this._layers as PlaneVisualizationLayer[];
    }

    public render(planeId: string, canvas: RenderTexture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, dimensionX: number = 0, dimensionY: number = 0, timeSinceStartMs: number = 0): RenderTexture
    {
        if(width < 1) width = 1;

        if(height < 1) height = 1;

        if((!canvas || (canvas.width !== width)) || (canvas.height !== height)) canvas = null;

        if(this._cachedBitmapData)
        {
            if((this._cachedBitmapData.width === width) && (this._cachedBitmapData.height === height) && (Vector3d.isEqual(this._cachedBitmapNormal, normal)))
            {
                if(!this.hasAnimationLayers)
                {
                    if(canvas)
                    {
                        TextureUtils.writeToRenderTexture(new Sprite(this._cachedBitmapData), canvas, true);

                        return canvas;
                    }

                    return this._cachedBitmapData;
                }
            }
            else
            {
                this._cachedBitmapData = null;
            }
        }

        this._isCached = true;

        if(!this._cachedBitmapData)
        {
            let cache = this._texturePool.get(planeId);
            let swapCache = this._texturePool.get(planeId + '-swap');

            if(!swapCache)
            {
                swapCache = TextureUtils.createAndFillRenderTexture(width, height);

                this._texturePool.set(planeId + '-swap', swapCache);
            }
            else
            {
                if(cache)
                {
                    [ cache, swapCache ] = [ swapCache, cache ];
                }
            }

            if(!cache)
            {
                cache = TextureUtils.createAndFillRenderTexture(width, height);

                this._texturePool.set(planeId, cache);
            }

            this._cachedBitmapData = swapCache;

            TextureUtils.clearAndFillRenderTexture(this._cachedBitmapData);
        }
        else
        {
            TextureUtils.clearAndFillRenderTexture(this._cachedBitmapData);
        }

        if(!canvas) canvas = this._cachedBitmapData;

        this._cachedBitmapNormal.assign(normal);

        if(this._layers && this._layers.length)
        {
            for(const layer of this._layers)
            {
                if(!layer) continue;

                if(layer instanceof PlaneVisualizationLayer)
                {
                    layer.render(canvas, width, height, normal, useTexture, offsetX, offsetY);
                }

                else if(layer instanceof PlaneVisualizationAnimationLayer)
                {
                    layer.render(canvas, width, height, normal, offsetX, offsetY, maxX, maxY, dimensionX, dimensionY, timeSinceStartMs);
                }
            }
        }

        if(canvas && (canvas !== this._cachedBitmapData))
        {
            TextureUtils.writeToRenderTexture(new Sprite(canvas), this._cachedBitmapData, false);

            return canvas;
        }

        return this._cachedBitmapData;
    }
}
