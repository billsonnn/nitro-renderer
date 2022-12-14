export class RoomEntryData
{
    private _roomId: number;
    private _roomName: string;
    private _hasControllers: boolean = false;

    constructor(roomId: number, roomName: string, hasControllers: boolean)
    {
        this._roomId = roomId;
        this._roomName = roomName;
        this._hasControllers = hasControllers;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public get hasControllers(): boolean
    {
        return this._hasControllers;
    }
}
