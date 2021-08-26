import { IMessageDataWrapper, IMessageParser } from '../../../../../core';

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
