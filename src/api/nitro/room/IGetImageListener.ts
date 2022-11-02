import { NitroRenderTexture } from '../../../pixi-proxy';

export interface IGetImageListener
{
    imageReady(id: number, texture: NitroRenderTexture, image?: HTMLImageElement): void;
    imageFailed(id: number): void;
}
