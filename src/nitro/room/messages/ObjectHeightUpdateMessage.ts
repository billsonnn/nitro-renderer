import { IVector3D } from '../../../api';
import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectHeightUpdateMessage extends RoomObjectUpdateMessage
{
    private _height: number;

    constructor(location: IVector3D, direction: IVector3D, height: number)
    {
        super(location, direction);

        this._height = height;
    }

    public get height(): number
    {
        return this._height;
    }
}
