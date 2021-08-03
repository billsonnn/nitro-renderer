import { SCALE_MODES } from '@pixi/constants';
import { AbstractRenderer, Renderer, RenderTexture, Resource, Texture } from '@pixi/core';
import { DisplayObject } from '@pixi/display';
import { Extract } from '@pixi/extract';
import { Rectangle } from '@pixi/math';
import { Nitro } from '../../nitro/Nitro';

export class TextureUtils
{
    public static generateTexture(displayObject: DisplayObject, region: Rectangle = null, scaleMode: number = SCALE_MODES.NEAREST, resolution: number = 1): RenderTexture
    {
        if(!displayObject) return null;

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

    public static generateImage(target: DisplayObject | RenderTexture): HTMLImageElement
    {
        if(!target) return null;

        return this.getExtractor().image(target);
    }

    public static generateImageUrl(target: DisplayObject | RenderTexture): string
    {
        if(!target) return null;

        return this.getExtractor().base64(target);
    }

    public static generateCanvas(target: DisplayObject | RenderTexture): HTMLCanvasElement
    {
        if(!target) return null;

        return this.getExtractor().canvas(target);
    }

    public static getRenderer(): Renderer | AbstractRenderer
    {
        return Nitro.instance.renderer;
    }

    public static getExtractor(): Extract
    {
        return (this.getRenderer().plugins.extract as Extract);
    }
}
