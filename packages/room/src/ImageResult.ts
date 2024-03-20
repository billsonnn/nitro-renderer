import { IImageResult } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Texture } from 'pixi.js';

export class ImageResult implements IImageResult
{
    public id: number = 0;
    public data: Texture = null;
    public image: HTMLImageElement = null;

    public async getImage(): Promise<HTMLImageElement>
    {
        if(this.image) return this.image;

        if(!this.data) return null;

        return await TextureUtils.generateImage(this.data);
    }
}
