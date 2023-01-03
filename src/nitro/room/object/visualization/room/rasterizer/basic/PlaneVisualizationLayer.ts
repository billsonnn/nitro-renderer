import { RenderTexture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { IVector3D } from '../../../../../../../api';
import { RoomTextureCache } from '../../../../../../../pixi-proxy';
import { PlaneMaterial } from './PlaneMaterial';

export class PlaneVisualizationLayer
{
    public static DEFAULT_OFFSET: number = 0;
    public static ALIGN_TOP: number = 1;
    public static ALIGN_BOTTOM: number = 2;
    public static ALIGN_DEFAULT: number = PlaneVisualizationLayer.ALIGN_TOP;

    private _material: PlaneMaterial;
    private _color: number;
    private _offset: number;
    private _align: number;
    private _bitmapData: RenderTexture;
    private _isDisposed: boolean;

    constructor(material: PlaneMaterial, color: number, align: number, offset: number = 0)
    {
        this._material = material;
        this._offset = offset;
        this._align = align;
        this._color = color;
        this._bitmapData = null;
        this._isDisposed = false;
    }

    public get offset(): number
    {
        return this._offset;
    }

    public get align(): number
    {
        return this._align;
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    public dispose(): void
    {
        this._isDisposed = true;
        this._material = null;

        this.clearCache();
    }

    public clearCache(): void
    {
        if(this._bitmapData)
        {
            this._bitmapData.destroy(true);

            this._bitmapData = null;
        }
    }

    public render(textureCache: RoomTextureCache, canvas: RenderTexture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number): RenderTexture
    {
        if(!canvas || (canvas.width !== width) || (canvas.height !== height)) canvas = null;

        const r = (this._color >> 16);
        const g = ((this._color >> 8) & 0xFF);
        const b = (this._color & 0xFF);

        let hasColor = false;

        if(((r < 0xFF) || (g < 0xFF))|| (b < 0xFF)) hasColor = true;

        let bitmapData: RenderTexture = null;

        if(this._material)
        {
            bitmapData = this._material.render(textureCache, hasColor ? null : canvas, width, height, normal, useTexture, offsetX, (offsetY + this.offset), (this.align === PlaneVisualizationLayer.ALIGN_TOP));

            if(bitmapData && (bitmapData !== canvas))
            {
                if(this._bitmapData) this._bitmapData.destroy();

                this._bitmapData = new RenderTexture(bitmapData.baseTexture);

                bitmapData = this._bitmapData;
            }

            if(bitmapData && hasColor)
            {
                const sprite = new Sprite(bitmapData);

                sprite.tint = this._color;

                textureCache.writeToRenderTexture(sprite, canvas, false);

                bitmapData = canvas;
            }
        }
        else
        {
            if(!canvas)
            {
                if(this._bitmapData && (this._bitmapData.width === width) && (this._bitmapData.height === height)) return this._bitmapData;

                if(this._bitmapData) this._bitmapData.destroy();

                this._bitmapData = textureCache.createAndFillRenderTexture(width, height, this._color);

                bitmapData = this._bitmapData;
            }
            else
            {
                textureCache.clearAndFillRenderTexture(canvas, this._color);

                bitmapData = canvas;
            }
        }

        return bitmapData;
    }

    public getMaterial(): PlaneMaterial
    {
        return this._material;
    }

    public getColor(): number
    {
        return this._color;
    }
}
