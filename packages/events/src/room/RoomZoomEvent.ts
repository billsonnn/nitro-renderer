import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomZoomEvent extends RoomEngineEvent
{
    public static ROOM_ZOOM: string = 'REE_ROOM_ZOOM';

    private _level: number;
    private _isFlipForced: boolean;

    constructor(roomId: number, level: number, isFlipForced: boolean = false)
    {
        super(RoomZoomEvent.ROOM_ZOOM, roomId);

        this._level = level;
        this._isFlipForced = isFlipForced;
    }

    public get level(): number
    {
        return this._level;
    }

    public get isFlipForced(): boolean
    {
        return this._isFlipForced;
    }
}
