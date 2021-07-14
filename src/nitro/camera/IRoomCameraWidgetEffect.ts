import { ColorMatrix } from '@pixi/filter-color-matrix';
import { Resource, Texture } from 'pixi.js';

export interface IRoomCameraWidgetEffect
{
    name: string;
    minLevel: number;
    texture: Texture<Resource>;
    colorMatrix: ColorMatrix;
    blendMode: number;
}
