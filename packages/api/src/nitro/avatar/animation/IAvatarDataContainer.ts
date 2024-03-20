import { Filter } from 'pixi.js';

export interface IAvatarDataContainer
{
    ink: number;
    colorTransform: Filter;
    paletteIsGrayscale: boolean;
    reds: number[];
    greens: number[];
    blues: number[];
    alphas: number[];
}
