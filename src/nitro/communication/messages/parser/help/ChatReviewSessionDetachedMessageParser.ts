import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

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
