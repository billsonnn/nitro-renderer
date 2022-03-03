import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomZoomEvent extends RoomEngineEvent
{
    public static ROOM_ZOOM: string = 'REE_ROOM_ZOOM';

    private _level: number;
    private _forceFlip: boolean;
    private _asDelta: boolean;

    constructor(roomId: number, level: number, forceFlip: boolean = false, asDelta: boolean = false)
    {
        super(RoomZoomEvent.ROOM_ZOOM, roomId);

        this._level = level;
        this._forceFlip = forceFlip;
        this._asDelta = asDelta;
    }

    public get level(): number
    {
        return this._level;
    }

    public get forceFlip(): boolean
    {
        return this._forceFlip;
    }

    public get asDelta(): boolean
    {
        return this._asDelta;
    }
}