import { RoomObjectUpdateMessage } from '../../../room/messages/RoomObjectUpdateMessage';
import { IVector3D } from '../../../room/utils/IVector3D';

export class ObjectMoveUpdateMessage extends RoomObjectUpdateMessage
{
    private _targetLocation: IVector3D;
    private _isSlide: boolean;

    constructor(location: IVector3D, targetLocation: IVector3D, direction: IVector3D, isSlide: boolean = false)
    {
        super(location, direction);

        this._targetLocation    = targetLocation;
        this._isSlide           = isSlide;
    }

    public get targetLocation(): IVector3D
    {
        if(!this._targetLocation) return this.location;

        return this._targetLocation;
    }

    public get isSlide(): boolean
    {
        return this._isSlide;
    }
}