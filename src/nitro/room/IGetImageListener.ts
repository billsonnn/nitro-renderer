import { NitroRenderTexture } from '../..';

export interface IGetImageListener
{
    imageReady(id: number, texture: NitroRenderTexture, image?: HTMLImageElement): void;
    imageFailed(id: number): void;
}
