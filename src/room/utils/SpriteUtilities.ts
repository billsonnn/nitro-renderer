import { BLEND_MODES } from '@pixi/constants';

export class SpriteUtilities
{
    public static hex2int(hex: string): number
    {
        return parseInt(hex, 16);
    }

    public static inkToBlendMode(ink: string | number): number
    {
        if(ink == 'ADD' || ink == 33) return BLEND_MODES.ADD;

        if(ink == 'SUBTRACT') return BLEND_MODES.SUBTRACT;

        if(ink == 'DARKEN') return BLEND_MODES.DARKEN;

        return BLEND_MODES.NORMAL;
    }
}
