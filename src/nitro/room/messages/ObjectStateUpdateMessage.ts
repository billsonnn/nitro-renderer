import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectStateUpdateMessage extends RoomObjectUpdateMessage
{
    constructor()
    {
        super(null, null);
    }
}
