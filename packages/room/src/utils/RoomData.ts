import { RoomMapData } from '../object';

export class RoomData
{
    private _roomId: number;
    private _data: RoomMapData;
    private _floorType: string;
    private _wallType: string;
    private _landscapeType: string;

    constructor(roomId: number, data: RoomMapData)
    {
        this._roomId = roomId;
        this._data = data;
        this._floorType = null;
        this._wallType = null;
        this._landscapeType = null;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get data(): RoomMapData
    {
        return this._data;
    }

    public get floorType(): string
    {
        return this._floorType;
    }

    public set floorType(k: string)
    {
        this._floorType = k;
    }

    public get wallType(): string
    {
        return this._wallType;
    }

    public set wallType(k: string)
    {
        this._wallType = k;
    }

    public get landscapeType(): string
    {
        return this._landscapeType;
    }

    public set landscapeType(k: string)
    {
        this._landscapeType = k;
    }
}
