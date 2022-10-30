import { Resource, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';

export interface IGraphicAsset
{
    name: string;
    source: string;
    texture: Texture<Resource>;
    usesPalette: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
    flipH: boolean;
    flipV: boolean;
    rectangle: Rectangle;
}
