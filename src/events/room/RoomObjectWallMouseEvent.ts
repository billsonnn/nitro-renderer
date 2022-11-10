import { IRoomObject, IVector3D, Vector3d } from '../../api';
import { RoomObjectMouseEvent } from './RoomObjectMouseEvent';

export class RoomObjectWallMouseEvent extends RoomObjectMouseEvent
{
    private _wallLocation: IVector3D;
    private _wallWd: IVector3D;
    private _wallHt: IVector3D;
    private _x: number;
    private _y: number;
    private _direction: number;

    constructor(type: string, object: IRoomObject, eventId: string, wallLocation: IVector3D, wallWidth: IVector3D, wallHeight: IVector3D, x: number, y: number, direction: number, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false, buttonDown: boolean = false)
    {
        super(type, object, eventId, altKey, ctrlKey, shiftKey, buttonDown);

        this._wallLocation = new Vector3d();
        this._wallWd = new Vector3d();
        this._wallHt = new Vector3d();

        this._wallLocation.assign(wallLocation);
        this._wallWd.assign(wallWidth);
        this._wallHt.assign(wallHeight);

        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    public get wallLocation(): IVector3D
    {
        return this._wallLocation;
    }

    public get wallWidth(): IVector3D
    {
        return this._wallWd;
    }

    public get wallHeight(): IVector3D
    {
        return this._wallHt;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get direction(): number
    {
        return this._direction;
    }
}
