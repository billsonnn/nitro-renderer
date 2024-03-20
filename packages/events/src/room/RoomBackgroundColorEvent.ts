import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomBackgroundColorEvent extends RoomEngineEvent
{
    public static ROOM_COLOR: string = 'REE_ROOM_COLOR';

    private _color: number;
    private _brightness: number;
    private _bgOnly: boolean;

    constructor(roomId: number, color: number, _arg_3: number, _arg_4: boolean)
    {
        super(RoomBackgroundColorEvent.ROOM_COLOR, roomId);

        this._color = color;
        this._brightness = _arg_3;
        this._bgOnly = _arg_4;
    }

    public get color(): number
    {
        return this._color;
    }

    public get brightness(): number
    {
        return this._brightness;
    }

    public get bgOnly(): boolean
    {
        return this._bgOnly;
    }
}
