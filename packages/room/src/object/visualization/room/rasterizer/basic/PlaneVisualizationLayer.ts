import { IVector3D } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Sprite, Texture } from 'pixi.js';
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
    private _isDisposed: boolean;

    constructor(material: PlaneMaterial, color: number, align: number, offset: number = 0)
    {
        this._material = material;
        this._offset = offset;
        this._align = align;
        this._color = color;
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
    }

    public render(planeId: string, canvas: Texture, width: number, height: number, normal: IVector3D, useTexture: boolean, offsetX: number, offsetY: number): Texture
    {
        const r = (this._color >> 16);
        const g = ((this._color >> 8) & 0xFF);
        const b = (this._color & 0xFF);
        const hasColor = ((r < 0xFF) || (g < 0xFF) || (b < 0xFF));

        if(this._material)
        {
            const bitmapData = this._material.render(planeId, hasColor ? null : canvas, width, height, normal, useTexture, offsetX, (offsetY + this.offset), (this.align === PlaneVisualizationLayer.ALIGN_TOP));

            if(bitmapData && hasColor)
            {
                const sprite = new Sprite(bitmapData);

                if(hasColor) sprite.tint = this._color;

                TextureUtils.writeToTexture(sprite, canvas, false);
            }
        }
        else
        {
            const bitmapData = TextureUtils.createAndFillRenderTexture(width, height, this._color);

            TextureUtils.writeToTexture(new Sprite(bitmapData), canvas, false);
        }

        return canvas;
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
