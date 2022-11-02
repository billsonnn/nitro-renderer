import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { UserChatlogMessageParser } from '../../parser';

export class UserChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserChatlogMessageParser);
    }

    public getParser(): UserChatlogMessageParser
    {
        return this.parser as UserChatlogMessageParser;
    }
}
