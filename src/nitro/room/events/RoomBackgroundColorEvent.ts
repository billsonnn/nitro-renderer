import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomBackgroundColorEvent extends RoomEngineEvent
{
    public static ROOM_COLOR: string = 'REE_ROOM_COLOR';

    private _color: number;
    private _Str_21672: number;
    private _Str_6930: boolean;

    constructor(roomId: number, color: number, _arg_3: number, _arg_4: boolean)
    {
        super(RoomBackgroundColorEvent.ROOM_COLOR, roomId);

        this._color     = color;
        this._Str_21672 = _arg_3;
        this._Str_6930  = _arg_4;
    }

    public get color(): number
    {
        return this._color;
    }

    public get _Str_5123(): number
    {
        return this._Str_21672;
    }

    public get _Str_11464(): boolean
    {
        return this._Str_6930;
    }
}