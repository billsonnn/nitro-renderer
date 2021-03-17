import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { IActionDefinition } from './actions/IActionDefinition';
import { AnimationFrame } from './structure/animation/AnimationFrame';
import { IPartColor } from './structure/figure/IPartColor';

export class AvatarImagePartContainer
{
    private _bodyPartId: string;
    private _partType: string;
    private _flippedPartType: string;
    private _partId: string;
    private _color: IPartColor;
    private _frames: AnimationFrame[];
    private _action: IActionDefinition;
    private _isColorable: boolean;
    private _isBlendable: boolean;
    private _blendTransform: AdjustmentFilter;
    private _paletteMapId: number;

    constructor(k: string, _arg_2: string, _arg_3: string, _arg_4: IPartColor, _arg_5: AnimationFrame[], _arg_6: IActionDefinition, _arg_7: boolean, _arg_8: number, _arg_9: string = '', _arg_10: boolean = false, _arg_11: number = 1)
    {
        this._bodyPartId        = k;
        this._partType          = _arg_2;
        this._partId            = _arg_3;
        this._color             = _arg_4;
        this._frames            = _arg_5;
        this._action            = _arg_6;
        this._isColorable       = _arg_7;
        this._paletteMapId      = _arg_8;
        this._flippedPartType   = _arg_9;
        this._isBlendable       = _arg_10;
        this._blendTransform    = null;

        if(this._partType === 'ey') this._isColorable = false;
    }

    public _Str_1674(k: number): number
    {
        if(!this._frames || !this._frames.length) return 0;

        const frameNumber = (k % this._frames.length);

        if(this._frames[frameNumber] instanceof AnimationFrame)
        {
            return this._frames[frameNumber].number;
        }

        return frameNumber;
    }

    public _Str_2258(k: number): AnimationFrame
    {
        const frameNumber = (k % this._frames.length);

        if(this._frames && (this._frames.length > frameNumber))
        {
            if(this._frames[frameNumber] instanceof AnimationFrame)
            {
                return this._frames[frameNumber];
            }
        }

        return null;
    }

    public _Str_1206(k: number): string
    {
        const frameNumber = (k % this._frames.length);

        if(this._frames && (this._frames.length > frameNumber))
        {
            if(this._frames[frameNumber] instanceof AnimationFrame)
            {
                const frame = this._frames[frameNumber];

                return (this._Str_1502 + ':' + frame._Str_778 + ':' + frame.number);
            }
        }

        return (this._Str_1502 + ':' + frameNumber);
    }

    public get _Str_1360(): string
    {
        return this._bodyPartId;
    }

    public get _Str_1669(): string
    {
        return this._partType;
    }

    public get _Str_1502(): string
    {
        return this._partId;
    }

    public get color(): IPartColor
    {
        return this._color;
    }

    public get action(): IActionDefinition
    {
        return this._action;
    }

    public get isColorable(): boolean
    {
        return this._isColorable;
    }

    public set isColorable(k: boolean)
    {
        this._isColorable = k;
    }

    public get _Str_1406(): number
    {
        return this._paletteMapId;
    }

    public get _Str_1666(): string
    {
        return this._flippedPartType;
    }

    public get _Str_1184(): boolean
    {
        return this._isBlendable;
    }

    public toString(): string
    {
        return [ this._bodyPartId, this._partType, this._partId ].join(':');
    }
}