import { RoomObjectUpdateMessage } from '../../../room/messages/RoomObjectUpdateMessage';

export class ObjectStateUpdateMessage extends RoomObjectUpdateMessage
{
    constructor()
    {
        super(null, null);
    }
}