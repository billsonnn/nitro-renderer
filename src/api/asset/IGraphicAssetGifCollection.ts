import { Resource, Texture } from '@pixi/core';

export interface IGraphicAssetGifCollection
{
    name: string;
    textures: Texture<Resource>[];
    durations: number[];
}
