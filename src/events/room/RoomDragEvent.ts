import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomDragEvent extends RoomEngineEvent
{
    public static ROOM_DRAG: string = 'RDE_ROOM_DRAG';

    private _offsetX: number;
    private _offsetY: number;

    constructor(roomId: number, offsetX: number, offsetY: number)
    {
        super(RoomDragEvent.ROOM_DRAG, roomId);

        this._offsetX = offsetX;
        this._offsetY = offsetY;
    }

    public get offsetX(): number
    {
        return this._offsetX;
    }

    public get offsetY(): number
    {
        return this._offsetY;
    }
}
