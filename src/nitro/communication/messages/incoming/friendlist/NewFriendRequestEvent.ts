import { IMessageEvent, MessageEvent } from '../../../../../core';
import { NewFriendRequestParser } from '../../parser/friendlist/NewFriendRequestMessageParser';

export class NewFriendRequestEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NewFriendRequestParser);
    }

    public getParser(): NewFriendRequestParser
    {
        return this.parser as NewFriendRequestParser;
    }
}
