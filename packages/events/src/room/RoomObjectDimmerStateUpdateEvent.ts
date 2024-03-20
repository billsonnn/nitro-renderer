import { IRoomObject } from '@nitrots/api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectDimmerStateUpdateEvent extends RoomObjectEvent
{
    public static DIMMER_STATE: string = 'RODSUE_DIMMER_STATE';

    private _state: number;
    private _presetId: number;
    private _effectId: number;
    private _color: number;
    private _brightness: number;

    constructor(object: IRoomObject, state: number, presetId: number, effectId: number, color: number, brightness: number)
    {
        super(RoomObjectDimmerStateUpdateEvent.DIMMER_STATE, object);

        this._state = state;
        this._presetId = presetId;
        this._effectId = effectId;
        this._color = color;
        this._brightness = brightness;
    }

    public get state(): number
    {
        return this._state;
    }

    public get presetId(): number
    {
        return this._presetId;
    }

    public get effectId(): number
    {
        return this._effectId;
    }

    public get color(): number
    {
        return this._color;
    }

    public get brightness(): number
    {
        return this._brightness;
    }
}
