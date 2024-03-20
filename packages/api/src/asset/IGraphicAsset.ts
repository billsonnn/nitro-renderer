import { Rectangle, Texture } from 'pixi.js';

export interface IGraphicAsset
{
    recycle(): void;
    readonly name: string;
    readonly source: string;
    readonly texture: Texture;
    readonly usesPalette: boolean;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly flipH: boolean;
    readonly flipV: boolean;
    readonly rectangle: Rectangle;
}
