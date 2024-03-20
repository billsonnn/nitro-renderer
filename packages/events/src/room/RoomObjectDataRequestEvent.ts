import { IRoomObject } from '@nitrots/api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectDataRequestEvent extends RoomObjectEvent
{
    public static RODRE_CURRENT_USER_ID: string = 'RODRE_CURRENT_USER_ID';
    public static RODRE_URL_PREFIX: string = 'RODRE_URL_PREFIX';

    constructor(type: string, object: IRoomObject)
    {
        super(type, object);
    }
}
