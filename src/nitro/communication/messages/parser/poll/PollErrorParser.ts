import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class PollErrorParser implements IMessageParser
{
    flush(): boolean
    {
        throw true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
