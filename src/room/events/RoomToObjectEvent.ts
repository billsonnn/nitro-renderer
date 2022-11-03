import { NitroEvent } from '../../events';

export class RoomToObjectEvent extends NitroEvent
{
    public constructor(type: string)
    {
        super(type);
    }
}
