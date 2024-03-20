import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectStateUpdateMessage extends RoomObjectUpdateMessage
{
    constructor()
    {
        super(null, null);
    }
}
