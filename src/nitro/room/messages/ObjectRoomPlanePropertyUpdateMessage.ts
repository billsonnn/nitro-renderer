import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectRoomPlanePropertyUpdateMessage extends RoomObjectUpdateMessage
{
    public static WALL_THICKNESS: string = 'RORPPUM_WALL_THICKNESS';
    public static FLOOR_THICKNESS: string = 'RORPVUM_FLOOR_THICKNESS';

    private _type: string;
    private _value: number;

    constructor(type: string, value: number)
    {
        super(null, null);

        this._type = type;
        this._value = value;
    }

    public get type(): string
    {
        return this._type;
    }

    public get value(): number
    {
        return this._value;
    }
}
