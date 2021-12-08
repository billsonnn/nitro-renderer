import { IMessageDataWrapper } from '../../../../../core';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class ChatReviewSessionDetachedMessageParser implements IMessageParser
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
