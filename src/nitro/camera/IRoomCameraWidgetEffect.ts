import { ColorMatrix } from '@pixi/filter-color-matrix';
import { Texture } from 'pixi.js';

export interface IRoomCameraWidgetEffect
{
    name: string;
    minLevel: number;
    texture: Texture;
    colorMatrix: ColorMatrix;
    blendMode: number;
}
