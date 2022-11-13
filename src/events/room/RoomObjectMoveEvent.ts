import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectMoveEvent extends RoomObjectEvent
{
    public static POSITION_CHANGED: string = 'ROME_POSITION_CHANGED';
    public static OBJECT_REMOVED: string = 'ROME_OBJECT_REMOVED';

    constructor(k: string, _arg_2: IRoomObject)
    {
        super(k, _arg_2);
    }
}
