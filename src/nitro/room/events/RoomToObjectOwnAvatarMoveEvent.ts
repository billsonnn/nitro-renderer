import { RoomToObjectEvent } from '../../../room/events/RoomToObjectEvent';
import { IVector3D } from '../../../room/utils/IVector3D';

export class RoomToObjectOwnAvatarMoveEvent extends RoomToObjectEvent
{
    public static ROAME_MOVE_TO: string = 'ROAME_MOVE_TO';

    private _targetLocation: IVector3D;

    constructor(type: string, targetLocation: IVector3D)
    {
        super(type);

        this._targetLocation = targetLocation;
    }

    public get targetLocation(): IVector3D
    {
        return this._targetLocation;
    }
}