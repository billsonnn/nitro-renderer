import { RenderTexture } from 'pixi.js';
import { TextureUtils } from '../../room/utils/TextureUtils';

export class ImageResult
{
    public id: number               = 0;
    public data: RenderTexture      = null;
    public image: HTMLImageElement  = null;

    public getImage(): HTMLImageElement
    {
        if(this.image) return this.image;

        if(!this.data) return null;

        return TextureUtils.generateImage(this.data);
    }
}