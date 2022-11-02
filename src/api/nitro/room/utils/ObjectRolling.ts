import { IVector3D } from '../../../room';

export class ObjectRolling
{
    public static MOVE: string = 'mv';
    public static SLIDE: string = 'sld';

    private _id: number;
    private _location: IVector3D;
    private _targetLocation: IVector3D;
    private _movementType: string;

    constructor(id: number, location: IVector3D, targetLocation: IVector3D, movementType: string = null)
    {
        this._id = id;
        this._location = location;
        this._targetLocation = targetLocation;
        this._movementType = movementType;
    }

    public get id(): number
    {
        return this._id;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get targetLocation(): IVector3D
    {
        return this._targetLocation;
    }

    public get movementType(): string
    {
        return this._movementType;
    }
}
