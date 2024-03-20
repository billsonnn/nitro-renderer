import { Texture } from 'pixi.js';

export interface IImageResult
{
    id: number;
    data: Texture;
    image: HTMLImageElement;
    getImage(): Promise<HTMLImageElement>;
}
