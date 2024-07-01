import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomFloorHoleUpdateMessage extends RoomObjectUpdateMessage
{
    public static ADD: string = 'ORPFHUM_ADD';
    public static REMOVE: string = 'ORPFHUM_REMOVE';

    private _type: string;
    private _id: number;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _invert: boolean;

    constructor(type: string, id: number, x: number = 0, y: number = 0, width: number = 0, height: number = 0, invert: boolean = false)
    {
        super(null, null);

        this._type = type;
        this._id = id;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._invert = invert;
    }

    public get type(): string
    {
        return this._type;
    }

    public get id(): number
    {
        return this._id;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get invert(): boolean
    {
        return this._invert;
    }
}
