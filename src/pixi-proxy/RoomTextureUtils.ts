import { AbstractRenderer, Renderer, RenderTexture, Texture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { Extract } from '@pixi/extract';
import { Matrix, Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { PixiApplicationProxy } from './PixiApplicationProxy';

export class RoomTextureUtils
{
    public static RENDER_TEXTURE_CACHE: RenderTexture[] = [];

    public static clearCache(): void
    {
        this.RENDER_TEXTURE_CACHE.forEach(renderTexture => renderTexture?.destroy(true));

        this.RENDER_TEXTURE_CACHE = [];
    }

    public static clearRenderTexture(renderTexture: RenderTexture): RenderTexture
    {
        if(!renderTexture) return null;

        return this.writeToRenderTexture(new Sprite(Texture.EMPTY), renderTexture);
    }

    public static createRenderTexture(width: number, height: number): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = RenderTexture.create({
            width,
            height
        });

        this.RENDER_TEXTURE_CACHE.push(renderTexture);

        return renderTexture;
    }

    public static createAndFillRenderTexture(width: number, height: number, color: number = 16777215): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = this.createRenderTexture(width, height);

        return this.clearAndFillRenderTexture(renderTexture, color);
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

    public static getPixels(displayObject: DisplayObject | RenderTexture, frame: Rectangle = null): Uint8Array
    {
        return this.getExtractor().pixels(displayObject);
    }

    public static getRenderer(): Renderer | AbstractRenderer
    {
        return PixiApplicationProxy.instance.renderer;
    }

    public static getExtractor(): Extract
    {
        return (this.getRenderer().plugins.extract as Extract);
    }
}
