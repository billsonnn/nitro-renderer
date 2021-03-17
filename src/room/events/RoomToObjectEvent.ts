import { NitroEvent } from '../../core/events/NitroEvent';

export class RoomToObjectEvent extends NitroEvent
{
    public constructor(type: string)
    {
        super(type);
    }
}