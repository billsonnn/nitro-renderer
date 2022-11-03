import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UserEventCatsMessageParser } from '../../parser';

export class UserEventCatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserEventCatsMessageParser);
    }

    public getParser(): UserEventCatsMessageParser
    {
        return this.parser as UserEventCatsMessageParser;
    }
}
