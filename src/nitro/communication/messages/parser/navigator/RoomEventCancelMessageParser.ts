import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class RoomEventCancelMessageParser implements IMessageParser
{
    flush(): boolean
    {
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }

}
