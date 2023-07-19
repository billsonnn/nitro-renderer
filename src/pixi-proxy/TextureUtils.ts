import { ICanvas, IRenderer, Matrix, Rectangle, RenderTexture, Resource, settings, Texture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { IExtract } from '@pixi/extract';
import { Sprite } from '@pixi/sprite';
import { PixiApplicationProxy } from './PixiApplicationProxy';

export class TextureUtils
{
    public static generateTexture(displayObject: DisplayObject, region: Rectangle = null, scaleMode: number = null, resolution: number = 1): RenderTexture
    {
        if(!displayObject) return null;

        if(scaleMode === null) scaleMode = settings.SCALE_MODE;

        return this.getRenderer().generateTexture(displayObject, {
            scaleMode,
            resolution,
            region
        });
    }

    public static generateTextureFromImage(image: HTMLImageElement): Texture<Resource>
    {
        if(!image) return null;

        return Texture.from(image);
    }

    public static async generateImage(target: DisplayObject | RenderTexture): Promise<HTMLImageElement>
    {
        if(!target) return null;

        return this.getExtractor().image(target);
    }

    public static async generateImageUrl(target: DisplayObject | RenderTexture): Promise<string>
    {
        if(!target) return null;

        return this.getExtractor().base64(target);
    }

    public static generateCanvas(target: DisplayObject | RenderTexture): ICanvas
    {
        if(!target) return null;

        return this.getExtractor().canvas(target);
    }

    public static clearRenderTexture(renderTexture: RenderTexture): RenderTexture
    {
        if(!renderTexture) return null;

        return this.writeToRenderTexture(new Sprite(Texture.EMPTY), renderTexture);
    }

    public static createRenderTexture(width: number, height: number): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        return RenderTexture.create({
            width,
            height
        });
    }

    public static createAndFillRenderTexture(width: number, height: number, color: number = 16777215): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = this.createRenderTexture(width, height);

        return this.clearAndFillRenderTexture(renderTexture, color);
    }

    public static createAndWriteRenderTexture(width: number, height: number, displayObject: DisplayObject, transform: Matrix = null): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = this.createRenderTexture(width, height);

        return this.writeToRenderTexture(displayObject, renderTexture, true, transform);
    }

    public static clearAndFillRenderTexture(renderTexture: RenderTexture, color: number = 16777215): RenderTexture
    {
        if(!renderTexture) return null;

        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = color;

        sprite.width = renderTexture.width;
        sprite.height = renderTexture.height;

        return this.writeToRenderTexture(sprite, renderTexture);
    }

    public static writeToRenderTexture(displayObject: DisplayObject, renderTexture: RenderTexture, clear: boolean = true, transform: Matrix = null): RenderTexture
    {
        if(!displayObject || !renderTexture) return null;

        this.getRenderer().render(displayObject, {
            renderTexture,
            clear,
            transform
        });

        return renderTexture;
    }

    public static getPixels(displayObject: DisplayObject | RenderTexture, frame: Rectangle = null): Uint8Array | Uint8ClampedArray
    {
        return this.getExtractor().pixels(displayObject);
    }

    public static getRenderer(): IRenderer<ICanvas>
    {
        return PixiApplicationProxy.instance.renderer;
    }

    public static getExtractor(): IExtract
    {
        return this.getRenderer().extract;
    }
}
