import { RoomObjectUpdateMessage } from '../../../room/messages/RoomObjectUpdateMessage';
import { IVector3D } from '../../../room/utils/IVector3D';

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