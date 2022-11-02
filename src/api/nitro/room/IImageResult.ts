import { RenderTexture } from '@pixi/core';

export interface IImageResult
{
    id: number;
    data: RenderTexture;
    image: HTMLImageElement;
    getImage(): HTMLImageElement;
}
