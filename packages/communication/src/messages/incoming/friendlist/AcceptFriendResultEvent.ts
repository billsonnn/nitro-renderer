import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { AcceptFriendResultParser } from '../../parser';

export class AcceptFriendResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AcceptFriendResultParser);
    }

    public getParser(): AcceptFriendResultParser
    {
        return this.parser as AcceptFriendResultParser;
    }
}
