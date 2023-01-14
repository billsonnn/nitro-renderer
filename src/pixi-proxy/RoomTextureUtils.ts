import { AbstractRenderer, Renderer, RenderTexture, Texture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { Extract } from '@pixi/extract';
import { Matrix, Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { PixiApplicationProxy } from './PixiApplicationProxy';

export class PlaneTextureCache
{
    private static DEFAULT_PLANE_ID = 'DEFAULT';

    public RENDER_TEXTURE_POOL: Map<string, RenderTexture> = new Map();
    public RENDER_TEXTURE_CACHE: RenderTexture[] = [];

    public clearCache(): void
    {
        this.RENDER_TEXTURE_POOL.forEach(renderTexture => renderTexture?.destroy(true));

        this.RENDER_TEXTURE_POOL.clear();
        this.RENDER_TEXTURE_CACHE = [];
    }

    public clearRenderTexture(renderTexture: RenderTexture): RenderTexture
    {
        if(!renderTexture) return null;

        return this.writeToRenderTexture(new Sprite(Texture.EMPTY), renderTexture);
    }

    private getTextureIdentifier(width: number, height: number, planeId: string): string
    {
        return `${ planeId ?? PlaneTextureCache.DEFAULT_PLANE_ID }:${ width }:${ height }`;
    }

    public createRenderTexture(width: number, height: number, planeId: string = null): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        if(!planeId)
        {
            const renderTexture = RenderTexture.create({
                width,
                height
            });

            this.RENDER_TEXTURE_CACHE.push(renderTexture);

            return renderTexture;
        }

        planeId = this.getTextureIdentifier(width, height, planeId);

        let renderTexture = this.RENDER_TEXTURE_POOL.get(planeId);

        if(!renderTexture)
        {
            renderTexture = RenderTexture.create({
                width,
                height
            });

            this.RENDER_TEXTURE_CACHE.push(renderTexture);

            this.RENDER_TEXTURE_POOL.set(planeId, renderTexture);
        }

        return renderTexture;
    }

    public createAndFillRenderTexture(width: number, height: number, planeId = null, color: number = 16777215): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = this.createRenderTexture(width, height, planeId);

        return this.clearAndFillRenderTexture(renderTexture, color);
    }

    public createAndWriteRenderTexture(width: number, height: number, displayObject: DisplayObject, planeId: string = null, transform: Matrix = null): RenderTexture
    {
        if((width < 0) || (height < 0)) return null;

        const renderTexture = this.createRenderTexture(width, height, planeId);

        return this.writeToRenderTexture(displayObject, renderTexture, true, transform);
    }

    public clearAndFillRenderTexture(renderTexture: RenderTexture, color: number = 16777215): RenderTexture
    {
        if(!renderTexture) return null;

        const sprite = new Sprite(Texture.WHITE);

        sprite.tint = color;

        sprite.width = renderTexture.width;
        sprite.height = renderTexture.height;

        return this.writeToRenderTexture(sprite, renderTexture);
    }

    public writeToRenderTexture(displayObject: DisplayObject, renderTexture: RenderTexture, clear: boolean = true, transform: Matrix = null): RenderTexture
    {
        if(!displayObject || !renderTexture) return null;

        this.getRenderer().render(displayObject, {
            renderTexture,
            clear,
            transform
        });

        return renderTexture;
    }

    public getPixels(displayObject: DisplayObject | RenderTexture, frame: Rectangle = null): Uint8Array
    {
        return this.getExtractor().pixels(displayObject);
    }

    public getRenderer(): Renderer | AbstractRenderer
    {
        return PixiApplicationProxy.instance.renderer;
    }

    public getExtractor(): Extract
    {
        return (this.getRenderer().plugins.extract as Extract);
    }
}
