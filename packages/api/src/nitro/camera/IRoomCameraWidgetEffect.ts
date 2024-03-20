import { BLEND_MODES, ColorMatrix, Texture } from 'pixi.js';

export interface IRoomCameraWidgetEffect
{
    name: string;
    minLevel: number;
    texture: Texture;
    colorMatrix: ColorMatrix;
    blendMode: BLEND_MODES;
}
