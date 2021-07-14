import { Rectangle, Resource, Texture } from 'pixi.js';

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
