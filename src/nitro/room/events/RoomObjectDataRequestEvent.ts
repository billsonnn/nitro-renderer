import { RoomObjectEvent } from '../../../room/events/RoomObjectEvent';
import { IRoomObject } from '../../../room/object/IRoomObject';

export class RoomObjectDataRequestEvent extends RoomObjectEvent
{
    public static RODRE_CURRENT_USER_ID: string = 'RODRE_CURRENT_USER_ID';
    public static RODRE_URL_PREFIX: string = 'RODRE_URL_PREFIX';

    constructor(type: string, object: IRoomObject)
    {
        super(type, object);
    }
}
