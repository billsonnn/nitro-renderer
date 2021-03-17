import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { IAssetAnimationAvatar } from '../../../core/asset/interfaces';
import { IAvatarDataContainer } from './IAvatarDataContainer';

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

        this._foreGround            = parseInt(foreground, 16);
        this._backGround            = parseInt(background, 16);
        this._colorTransform        = null;
        this._rgb                   = parseInt(foreground, 16);
        this._r                     = ((this._rgb >> 16) & 0xFF);
        this._g                     = ((this._rgb >> 8) & 0xFF);
        this._b                     = ((this._rgb >> 0) & 0xFF);
        this._redMultiplier         = ((this._r / 0xFF) * 1);
        this._greenMultiplier       = ((this._g / 0xFF) * 1);
        this._blueMultiplier        = ((this._b / 0xFF) * 1);
        this._alphaMultiplier       = 1;
        this._paletteIsGrayscale    = true;

        if(this._ink === 37)
        {
            this._alphaMultiplier = 0.5;
            this._paletteIsGrayscale = false;
        }

        this._colorMap = this._Str_1181(this._backGround, this._foreGround);
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

    public get _Str_832(): boolean
    {
        return this._paletteIsGrayscale;
    }

    private _Str_1181(k: number, _arg_2: number): Map<string, number[]>
    {
        const _local_3 = ((k >> 24) & 0xFF);
        const _local_4 = ((k >> 16) & 0xFF);
        const _local_5 = ((k >> 8) & 0xFF);
        const _local_6 = ((k >> 0) & 0xFF);
        const _local_7 = ((_arg_2 >> 24) & 0xFF);
        const _local_8 = ((_arg_2 >> 16) & 0xFF);
        const _local_9 = ((_arg_2 >> 8) & 0xFF);
        const _local_10 = ((_arg_2 >> 0) & 0xFF);
        const _local_11 = ((_local_7 - _local_3) / 0xFF);
        const _local_12 = ((_local_8 - _local_4) / 0xFF);
        const _local_13 = ((_local_9 - _local_5) / 0xFF);
        const _local_14 = ((_local_10 - _local_6) / 0xFF);
        const _local_15: Map<string, number[]> = new Map();
        const _local_16: number[] = [];
        const _local_17: number[] = [];
        const _local_18: number[] = [];
        const _local_19: number[] = [];
        let _local_20 = _local_3;
        let _local_21 = _local_4;
        let _local_22 = _local_5;
        let _local_23 = _local_6;
        let _local_24 = 0;
        while(_local_24 < 0x0100)
        {
            if((((_local_21 == _local_4) && (_local_22 == _local_5)) && (_local_23 == _local_6)))
            {
                _local_20 = 0;
            }
            _local_20 = (_local_20 + _local_11);
            _local_21 = (_local_21 + _local_12);
            _local_22 = (_local_22 + _local_13);
            _local_23 = (_local_23 + _local_14);
            _local_19.push((_local_20 << 24));
            _local_16.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
            _local_17.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
            _local_18.push(((((_local_20 << 24) | (_local_21 << 16)) | (_local_22 << 8)) | _local_23));
            _local_24++;
        }

        _local_15.set('alphas', _local_16);
        _local_15.set('reds', _local_16);
        _local_15.set('greens', _local_17);
        _local_15.set('blues', _local_18);

        return _local_15;
    }
}
