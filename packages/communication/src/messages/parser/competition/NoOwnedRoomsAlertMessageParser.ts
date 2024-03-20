import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class NoOwnedRoomsAlertMessageParser implements IMessageParser
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
