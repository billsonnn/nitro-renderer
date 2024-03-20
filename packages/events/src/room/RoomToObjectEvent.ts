import { NitroEvent } from '../core';

export class RoomToObjectEvent extends NitroEvent
{
    public constructor(type: string)
    {
        super(type);
    }
}
