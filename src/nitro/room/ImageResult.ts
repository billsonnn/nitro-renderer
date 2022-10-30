import { RenderTexture } from '@pixi/core';
import { TextureUtils } from '../../pixi-proxy';

export class ImageResult
{
    public id: number = 0;
    public data: RenderTexture = null;
    public image: HTMLImageElement = null;

    public getImage(): HTMLImageElement
    {
        if (this.image) return this.image;

        if (!this.data) return null;

        return TextureUtils.generateImage(this.data);
    }
}
