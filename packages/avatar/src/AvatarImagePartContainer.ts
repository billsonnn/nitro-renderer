import { IActionDefinition, IPartColor } from '@nitrots/api';
import { AvatarAnimationFrame } from './structure';

export class AvatarImagePartContainer
{
    private _bodyPartId: string;
    private _partType: string;
    private _flippedPartType: string;
    private _partId: string;
    private _color: IPartColor;
    private _frames: AvatarAnimationFrame[];
    private _action: IActionDefinition;
    private _isColorable: boolean;
    private _isBlendable: boolean;
    private _paletteMapId: number;

    constructor(bodyPartId: string, partType: string, partId: string, partColor: IPartColor, frames: AvatarAnimationFrame[], action: IActionDefinition, isColorable: boolean, paletteMapId: number, flippedPartType: string = '', isBlendable: boolean = false, _arg_11: number = 1)
    {
        this._bodyPartId = bodyPartId;
        this._partType = partType;
        this._partId = partId;
        this._color = partColor;
        this._frames = frames;
        this._action = action;
        this._isColorable = isColorable;
        this._paletteMapId = paletteMapId;
        this._flippedPartType = flippedPartType;
        this._isBlendable = isBlendable;

        if(this._partType === 'ey') this._isColorable = false;
    }

    public getFrameIndex(k: number): number
    {
        if(!this._frames || !this._frames.length) return 0;

        const frameNumber = (k % this._frames.length);

        if(this._frames[frameNumber] instanceof AvatarAnimationFrame)
        {
            return this._frames[frameNumber].number;
        }

        return frameNumber;
    }

    public getFrameDefinition(k: number): AvatarAnimationFrame
    {
        const frameNumber = (k % this._frames.length);

        if(this._frames && (this._frames.length > frameNumber))
        {
            if(this._frames[frameNumber] instanceof AvatarAnimationFrame)
            {
                return this._frames[frameNumber];
            }
        }

        return null;
    }

    public getCacheableKey(k: number): string
    {
        const frameNumber = (k % this._frames.length);

        if(this._frames && (this._frames.length > frameNumber))
        {
            if(this._frames[frameNumber] instanceof AvatarAnimationFrame)
            {
                const frame = this._frames[frameNumber];

                return (this.partId + ':' + frame.assetPartDefinition + ':' + frame.number);
            }
        }

        return (this.partId + ':' + frameNumber);
    }

    public get bodyPartId(): string
    {
        return this._bodyPartId;
    }

    public get partType(): string
    {
        return this._partType;
    }

    public get partId(): string
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

    public get paletteMapId(): number
    {
        return this._paletteMapId;
    }

    public get flippedPartType(): string
    {
        return this._flippedPartType;
    }

    public get isBlendable(): boolean
    {
        return this._isBlendable;
    }

    public toString(): string
    {
        return [this._bodyPartId, this._partType, this._partId].join(':');
    }
}
