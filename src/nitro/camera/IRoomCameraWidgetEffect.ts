import { Resource, Texture } from '@pixi/core';
import { ColorMatrix } from '@pixi/filter-color-matrix';

export interface IRoomCameraWidgetEffect
{
    name: string;
    minLevel: number;
    texture: Texture<Resource>;
    colorMatrix: ColorMatrix;
    blendMode: number;
}
