import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomUpdateMessage extends RoomObjectUpdateMessage
{
    public static ROOM_WALL_UPDATE: string = 'RORUM_ROOM_WALL_UPDATE';
    public static ROOM_FLOOR_UPDATE: string = 'RORUM_ROOM_FLOOR_UPDATE';
    public static ROOM_LANDSCAPE_UPDATE: string = 'RORUM_ROOM_LANDSCAPE_UPDATE';

    private _type: string;
    private _value: string;

    constructor(type: string, value: string)
    {
        super(null, null);

        this._type = type;
        this._value = value;
    }

    public get type(): string
    {
        return this._type;
    }

    public get value(): string
    {
        return this._value;
    }
}
