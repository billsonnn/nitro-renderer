import { IAssetAnimationAvatar, IAvatarDataContainer } from '../../../api';
import { AdjustmentFilter } from '../../../pixi-proxy';

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
        const alphaBackground = ((background >> 24) & 0xFF);
        const redBackground = ((background >> 16) & 0xFF);
        const greenBackground = ((background >> 8) & 0xFF);
        const blueBackground = ((background >> 0) & 0xFF);
        const alphaForeground = ((foreground >> 24) & 0xFF);
        const redForeground = ((foreground >> 16) & 0xFF);
        const greenForeground = ((foreground >> 8) & 0xFF);
        const blueForeground = ((foreground >> 0) & 0xFF);
        const alphaDifference = ((alphaForeground - alphaBackground) / 0xFF);
        const redDifference = ((redForeground - redBackground) / 0xFF);
        const greenDifference = ((greenForeground - greenBackground) / 0xFF);
        const blueDifference = ((blueForeground - blueBackground) / 0xFF);
        const _local_15: Map<string, number[]> = new Map();
        const _local_16: number[] = [];
        const _local_17: number[] = [];
        const _local_18: number[] = [];
        const _local_19: number[] = [];
        let _local_20 = alphaBackground;
        let _local_21 = redBackground;
        let _local_22 = greenBackground;
        let _local_23 = blueBackground;

        for(let i = 0; i < 256; i++)
        {
            if((((_local_21 == redBackground) && (_local_22 == greenBackground)) && (_local_23 == blueBackground)))
            {
                _local_20 = 0;
            }
            _local_20 = (_local_20 + alphaDifference);
            _local_21 = (_local_21 + redDifference);
            _local_22 = (_local_22 + greenDifference);
            _local_23 = (_local_23 + blueDifference);
            _local_19.push((_local_20 << 24));
            _local_16.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
            _local_17.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
            _local_18.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
        }

        _local_15.set('alphas', _local_16);
        _local_15.set('reds', _local_16);
        _local_15.set('greens', _local_17);
        _local_15.set('blues', _local_18);

        return _local_15;
    }
}
