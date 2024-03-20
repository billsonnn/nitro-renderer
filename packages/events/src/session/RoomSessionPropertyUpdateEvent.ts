import { IRoomSession } from '@nitrots/api';
import { RoomSessionEvent } from './RoomSessionEvent';

export class RoomSessionPropertyUpdateEvent extends RoomSessionEvent
{
    public static RSDUE_ALLOW_PETS: string = 'RSDUE_ALLOW_PETS';

    constructor(k: string, _arg_2: IRoomSession)
    {
        super(k, _arg_2);
    }
}
