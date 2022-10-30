import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ThreadMessagesMessageParser } from '../../parser/groupforums/ThreadMessagesMessageParser';

export class ThreadMessagesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThreadMessagesMessageParser);
    }

    public getParser(): ThreadMessagesMessageParser
    {
        return this.parser as ThreadMessagesMessageParser;
    }
}
