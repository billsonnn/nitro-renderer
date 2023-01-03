import { AdjustmentFilter } from '../../../../pixi-proxy';

export interface IAvatarDataContainer
{
    ink: number;
    colorTransform: AdjustmentFilter;
    paletteIsGrayscale: boolean;
    reds: number[];
    greens: number[];
    blues: number[];
    alphas: number[];
}
