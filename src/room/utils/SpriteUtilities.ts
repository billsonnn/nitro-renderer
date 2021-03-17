import { BLEND_MODES } from 'pixi.js';

export class SpriteUtilities
{
    public static hex2int(hex: string): number
    {
        return parseInt(hex, 16);
    }

    public static inkToBlendMode(ink: string | number): number
    {
        if(ink == 'ADD' || ink == 33) return BLEND_MODES.ADD;

        return BLEND_MODES.NORMAL;
    }
}