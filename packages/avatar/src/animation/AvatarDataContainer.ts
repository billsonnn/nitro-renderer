import { IAssetAnimationAvatar, IAvatarDataContainer } from '@nitrots/api';
import { AdjustmentFilter } from 'pixi-filters';

export class AvatarDataContainer implements IAvatarDataContainer
{
    private _ink: number;
    private _foreGround: number;
    private _backGround: number;
    private _colorTransform: AdjustmentFilter;
    private _rgb: number;
    private _r: number;
    private _g: number;
    private _b: number;
    private _redMultiplier: number;
    private _greenMultiplier: number;
    private _blueMultiplier: number;
    private _alphaMultiplier: number;
    private _colorMap: Map<string, number[]>;
    private _paletteIsGrayscale: boolean;

    constructor(k: IAssetAnimationAvatar)
    {
        this._ink = k.ink;

        let foreground = k.foreground;
        let background = k.background;

        foreground = foreground.replace('#', '');
        background = background.replace('#', '');

        this._foreGround = parseInt(foreground, 16);
        this._backGround = parseInt(background, 16);
        this._colorTransform = null;
        this._rgb = parseInt(foreground, 16);
        this._r = ((this._rgb >> 16) & 0xFF);
        this._g = ((this._rgb >> 8) & 0xFF);
        this._b = ((this._rgb >> 0) & 0xFF);
        this._redMultiplier = ((this._r / 0xFF) * 1);
        this._greenMultiplier = ((this._g / 0xFF) * 1);
        this._blueMultiplier = ((this._b / 0xFF) * 1);
        this._alphaMultiplier = 1;
        this._paletteIsGrayscale = true;

        if(this._ink === 37)
        {
            this._alphaMultiplier = 0.5;
            this._paletteIsGrayscale = false;
        }

        this._colorTransform = new AdjustmentFilter({ red: (this._r / 255), green: (this._g / 255), blue: (this._b / 255), alpha: this._alphaMultiplier });
        this._colorMap = this.generatePaletteMapForGrayscale(this._backGround, this._foreGround);
    }

    public get ink(): number
    {
        return this._ink;
    }

    public get colorTransform(): AdjustmentFilter
    {
        return this._colorTransform;
    }

    public get reds(): number[]
    {
        return this._colorMap.get('reds');
    }

    public get greens(): number[]
    {
        return this._colorMap.get('greens');
    }

    public get blues(): number[]
    {
        return this._colorMap.get('blues');
    }

    public get alphas(): number[]
    {
        return this._colorMap.get('alphas');
    }

    public get paletteIsGrayscale(): boolean
    {
        return this._paletteIsGrayscale;
    }

    private generatePaletteMapForGrayscale(background: number, foreground: number): Map<string, number[]>
    {
        const alphaBackground = (background >> 24) & 0xFF;
        const redBackground = (background >> 16) & 0xFF;
        const greenBackground = (background >> 8) & 0xFF;
        const blueBackground = background & 0xFF;

        const alphaForeground = (foreground >> 24) & 0xFF;
        const redForeground = (foreground >> 16) & 0xFF;
        const greenForeground = (foreground >> 8) & 0xFF;
        const blueForeground = foreground & 0xFF;

        const alphaStep = (alphaForeground - alphaBackground) / 255;
        const redStep = (redForeground - redBackground) / 255;
        const greenStep = (greenForeground - greenBackground) / 255;
        const blueStep = (blueForeground - blueBackground) / 255;

        const paletteMap: Map<string, number[]> = new Map();
        const gradientColors: number[] = [];

        let currentAlpha = alphaBackground;
        let currentRed = redBackground;
        let currentGreen = greenBackground;
        let currentBlue = blueBackground;

        for(let i = 0; i < 256; i++)
        {
            // Update the current colors by their respective steps
            currentAlpha += alphaStep;
            currentRed += redStep;
            currentGreen += greenStep;
            currentBlue += blueStep;

            // Clamp the color values between 0 and 255 to ensure valid color values
            const clampedAlpha = Math.max(0, Math.min(255, Math.round(currentAlpha)));
            const clampedRed = Math.max(0, Math.min(255, Math.round(currentRed)));
            const clampedGreen = Math.max(0, Math.min(255, Math.round(currentGreen)));
            const clampedBlue = Math.max(0, Math.min(255, Math.round(currentBlue)));

            // Combine the color components back into a single integer
            const color = (clampedAlpha << 24) | (clampedRed << 16) | (clampedGreen << 8) | clampedBlue;
            gradientColors.push(color);
        }

        // Since the gradients for all color channels are the same, we use the same array
        paletteMap.set('alphas', gradientColors);
        paletteMap.set('reds', gradientColors);
        paletteMap.set('greens', gradientColors);
        paletteMap.set('blues', gradientColors);

        return paletteMap;
    }
}
