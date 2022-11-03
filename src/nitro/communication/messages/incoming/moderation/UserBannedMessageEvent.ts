import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UserBannedMessageParser } from '../../parser';

export class UserBannedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserBannedMessageParser);
    }

    public getParser(): UserBannedMessageParser
    {
        return this.parser as UserBannedMessageParser;
    }
}
