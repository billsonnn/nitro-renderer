import { NitroEvent } from '../../../../core/events/NitroEvent';

export class RoomWidgetUpdateEvent extends NitroEvent
{
    constructor(type: string)
    {
        super(type);
    }
}