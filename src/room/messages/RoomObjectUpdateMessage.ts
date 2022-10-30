import { IVector3D } from '../../api';

export class RoomObjectUpdateMessage
{
    private _location: IVector3D;
    private _direction: IVector3D;

    constructor(location: IVector3D, direction: IVector3D)
    {
        this._location = location;
        this._direction = direction;
    }

    public get location(): IVector3D
    {
        return this._location;
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }
}
