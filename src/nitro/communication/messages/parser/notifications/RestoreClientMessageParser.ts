import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class RestoreClientMessageParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
