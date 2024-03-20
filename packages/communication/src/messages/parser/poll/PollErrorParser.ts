import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

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
