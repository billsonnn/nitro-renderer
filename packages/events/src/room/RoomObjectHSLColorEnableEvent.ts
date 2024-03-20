import { IRoomObject } from '@nitrots/api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectHSLColorEnableEvent extends RoomObjectEvent
{
    public static ROOM_BACKGROUND_COLOR: string = 'ROHSLCEE_ROOM_BACKGROUND_COLOR';

    private _enable: boolean;
    private _hue: number;
    private _saturation: number;
    private _lightness: number;

    constructor(k: string, _arg_2: IRoomObject, _arg_3: boolean, _arg_4: number, _arg_5: number, _arg_6: number)
    {
        super(k, _arg_2);

        this._enable = _arg_3;
        this._hue = _arg_4;
        this._saturation = _arg_5;
        this._lightness = _arg_6;
    }

    public get enable(): boolean
    {
        return this._enable;
    }

    public get hue(): number
    {
        return this._hue;
    }

    public get saturation(): number
    {
        return this._saturation;
    }

    public get lightness(): number
    {
        return this._lightness;
    }
}
