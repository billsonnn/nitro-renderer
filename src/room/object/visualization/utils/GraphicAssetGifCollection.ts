import { Resource, Texture } from '@pixi/core';

export class GraphicAssetGifCollection
{
    constructor(
        public name: string,
        public textures: Texture<Resource>[],
        public durations: number[]
    )
    {}
}
