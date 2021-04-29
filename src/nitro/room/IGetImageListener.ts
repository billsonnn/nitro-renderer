import { RenderTexture } from 'pixi.js';

export interface IGetImageListener
{
    imageReady(id: number, texture: RenderTexture, image?: HTMLImageElement): void;
    imageFailed(id: number): void;
}
