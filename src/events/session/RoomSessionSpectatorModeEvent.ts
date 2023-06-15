import { IRoomSession } from '@/api';
import { RoomSessionEvent } from '@/events';

export class RoomSessionSpectatorModeEvent extends RoomSessionEvent
{
    public static SPECTATOR_MODE: string = 'RSSME_SPECTATOR_MODE';

    constructor(type: string, session: IRoomSession)
    {
        super(type, session);
    }
}
