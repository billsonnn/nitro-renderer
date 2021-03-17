import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomEngineDimmerStateEvent extends RoomEngineEvent
{
    public static ROOM_COLOR: string = 'REDSE_ROOM_COLOR';

    private _state: number;
    private _presetId: number;
    private _effectId: number;
    private _color: number;
    private _brightness: number;

    constructor(k: number, state: number, presetId: number, effectId: number, color: number, brightness: number)
    {
        super(RoomEngineDimmerStateEvent.ROOM_COLOR, k);

        this._state         = state;
        this._presetId      = presetId;
        this._effectId      = effectId;
        this._color         = color;
        this._brightness    = brightness;
    }

    public get state(): number
    {
        return this._state;
    }

    public get _Str_14686(): number
    {
        return this._presetId;
    }

    public get _Str_6815(): number
    {
        return this._effectId;
    }

    public get color(): number
    {
        return this._color;
    }

    public get _Str_5123(): number
    {
        return this._brightness;
    }
}