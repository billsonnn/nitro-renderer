import { Texture } from 'pixi.js';

export interface IGetImageListener
{
    imageReady(id: number, texture: Texture, image?: HTMLImageElement): void;
    imageFailed(id: number): void;
}
