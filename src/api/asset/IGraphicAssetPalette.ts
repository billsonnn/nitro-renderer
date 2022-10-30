import { Resource, Texture } from '@pixi/core';

export interface IGraphicAssetPalette
{
    dispose: () => void;
    applyPalette(texture: Texture<Resource>): Texture<Resource>;
    primaryColor: number;
    secondaryColor: number;
}
