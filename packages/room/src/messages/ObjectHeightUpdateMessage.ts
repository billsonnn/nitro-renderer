import { IVector3D } from '@nitrots/api';
import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

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
