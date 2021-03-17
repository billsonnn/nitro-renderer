import { Graphics, Rectangle } from 'pixi.js';
import { IDisposable } from '../../../../../../../core/common/disposable/IDisposable';
import { IGraphicAssetCollection } from '../../../../../../../room/object/visualization/utils/IGraphicAssetCollection';
import { IRoomGeometry } from '../../../../../../../room/utils/IRoomGeometry';
import { IVector3D } from '../../../../../../../room/utils/IVector3D';
import { TextureUtils } from '../../../../../../../room/utils/TextureUtils';
import { Vector3d } from '../../../../../../../room/utils/Vector3d';
import { PlaneVisualizationAnimationLayer } from '../animated/PlaneVisualizationAnimationLayer';
import { PlaneMaterial } from './PlaneMaterial';
import { PlaneVisualizationLayer } from './PlaneVisualizationLayer';

export class PlaneVisualization
{
    private _layers: IDisposable[];
    private _geometry: IRoomGeometry;
    private _cachedBitmapData: Graphics;
    private _cachedBitmapNormal: Vector3d;
    private _isCached: boolean;
    private _hasAnimationLayers: boolean;

    constructor(k: number, _arg_2: number, _arg_3: IRoomGeometry)
    {
        this._layers                = [];
        this._geometry              = _arg_3;
        this._cachedBitmapData      = null;
        this._cachedBitmapNormal    = new Vector3d();
        this._isCached              = false;
        this._hasAnimationLayers    = false;

        if(_arg_2 < 0) _arg_2 = 0;

        let index = 0;

        while(index < _arg_2)
        {
            this._layers.push(null);

            index++;
        }
    }

    public get geometry(): IRoomGeometry
    {
        return this._geometry;
    }

    public get _Str_20530(): boolean
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
            this._cachedBitmapNormal.assign(new Vector3d());
        }

        if(this._layers && this._layers.length)
        {
            for(const layer of this._layers)
            {
                if(!layer) continue;

                const planeLayer = layer as PlaneVisualizationLayer;

                planeLayer._Str_3355();
            }
        }

        this._isCached = false;
    }

    public _Str_21464(k: number, _arg_2: PlaneMaterial, _arg_3: number, _arg_4: number, _arg_5: number = 0): boolean
    {
        if((k < 0) || (k > this._layers.length)) return false;

        let layer = this._layers[k];

        if(layer) layer.dispose();

        layer = new PlaneVisualizationLayer(_arg_2, _arg_3, _arg_4, _arg_5);

        this._layers[k] = layer;

        return true;
    }

    public _Str_23489(k: number, _arg_2: any, _arg_3: IGraphicAssetCollection): boolean
    {
        if((k < 0) || (k > this._layers.length)) return false;

        let layer = this._layers[k] as IDisposable;

        if(layer) layer.dispose();

        layer = new PlaneVisualizationAnimationLayer(_arg_2, _arg_3);

        this._layers[k]             = layer;
        this._hasAnimationLayers    = true;

        return true;
    }

    public _Str_8988(): PlaneVisualizationLayer[]
    {
        return this._layers as PlaneVisualizationLayer[];
    }

    public render(canvas: Graphics, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number = 0, offsetY: number = 0, maxX: number = 0, maxY: number = 0, dimensionX: number = 0, dimensionY: number = 0, timeSinceStartMs: number = 0): Graphics
    {
        if(width < 1) width = 1;

        if(height < 1) height = 1;

        if((!canvas || (canvas.width !== width)) || (canvas.height !== height)) canvas = null;

        if(this._cachedBitmapData)
        {
            if(((this._cachedBitmapData.width === width) && (this._cachedBitmapData.height === height)) && (Vector3d.isEqual(this._cachedBitmapNormal, normal)))
            {
                if(!this._Str_20530)
                {
                    if(canvas)
                    {
                        const texture = TextureUtils.generateTexture(this._cachedBitmapData, new Rectangle(0, 0, width, height));

                        if(texture)
                        {
                            canvas
                                .beginTextureFill({ texture })
                                .drawRect(0, 0, texture.width, texture.height)
                                .endFill();

                            return canvas;
                        }
                    }

                    return this._cachedBitmapData;
                }
            }
            else
            {
                this._cachedBitmapData.destroy();

                this._cachedBitmapData = null;
            }
        }

        this._isCached = true;

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
            const texture = TextureUtils.generateTexture(canvas, new Rectangle(0, 0, canvas.width, canvas.height));

            this._cachedBitmapData
                .beginTextureFill({ texture })
                .drawRect(0, 0, canvas.width, canvas.height)
                .endFill();

            return canvas;
        }

        return this._cachedBitmapData;
    }
}