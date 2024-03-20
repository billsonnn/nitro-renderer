import { Texture } from 'pixi.js';

export interface IGraphicAssetPalette
{
    applyPalette(texture: Texture): Texture;
    primaryColor: number;
    secondaryColor: number;
}
