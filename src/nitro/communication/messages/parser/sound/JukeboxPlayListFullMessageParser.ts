import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

export class JukeboxPlayListFullMessageParser implements IMessageParser
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
