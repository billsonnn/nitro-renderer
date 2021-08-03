import { RenderTexture } from '@pixi/core';

export interface IGetImageListener
{
    imageReady(id: number, texture: RenderTexture, image?: HTMLImageElement): void;
    imageFailed(id: number): void;
}
