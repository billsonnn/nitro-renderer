import { Extract } from '@pixi/extract';
import { AbstractRenderer, DisplayObject, Rectangle, Renderer, RenderTexture, Resource, SCALE_MODES, Texture } from 'pixi.js';
import { Nitro } from '../../nitro/Nitro';

export class TextureUtils
{
    private static _renderer: Renderer = null;

    public static generateTexture(displayObject: DisplayObject, region: Rectangle = null, scaleMode: number = SCALE_MODES.NEAREST, resolution: number = 1): RenderTexture
    {
        if(!displayObject) return null;

        return TextureUtils.getRenderer().generateTexture(displayObject, scaleMode, resolution, region);
    }

    public static generateTextureFromImage(image: HTMLImageElement): Texture<Resource>
    {
        if(!image) return null;

        return Texture.from(image);
    }

    public static generateImage(target: DisplayObject | RenderTexture): HTMLImageElement
    {
        if(!target) return null;

        const extract = (TextureUtils.getRenderer().plugins.extract as Extract);

        return extract.image(target);
    }

    public static generateImageUrl(target: DisplayObject | RenderTexture): string
    {
        if(!target) return null;

        const extract = (TextureUtils.getRenderer().plugins.extract as Extract);

        return extract.base64(target);
    }

    public static generateCanvas(target: DisplayObject | RenderTexture): HTMLCanvasElement
    {
        if(!target) return null;

        const extract = (TextureUtils.getRenderer().plugins.extract as Extract);

        return extract.canvas(target);
    }

    public static getRenderer(): Renderer | AbstractRenderer
    {
        if(!TextureUtils._renderer) return Nitro.instance.renderer;

        return TextureUtils._renderer;
    }

    public static setRenderer(renderer: Renderer): void
    {
        TextureUtils._renderer = renderer;
    }
}
