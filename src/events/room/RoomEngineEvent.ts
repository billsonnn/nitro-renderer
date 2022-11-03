import { NitroEvent } from '../core';

export class RoomEngineEvent extends NitroEvent
{
    public static INITIALIZED: string = 'REE_INITIALIZED';
    public static ENGINE_INITIALIZED: string = 'REE_ENGINE_INITIALIZED';
    public static OBJECTS_INITIALIZED: string = 'REE_OBJECTS_INITIALIZED';
    public static NORMAL_MODE: string = 'REE_NORMAL_MODE';
    public static GAME_MODE: string = 'REE_GAME_MODE';
    public static ROOM_ZOOMED: string = 'REE_ROOM_ZOOMED';
    public static DISPOSED: string = 'REE_DISPOSED';

    private _roomId: number;

    constructor(type: string, roomId: number)
    {
        super(type);

        this._roomId = roomId;
    }

    public get roomId(): number
    {
        return this._roomId;
    }
}
