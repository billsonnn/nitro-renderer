import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { UnreadForumsCountMessageParser } from '../../parser/groupforums/UnreadForumsCountMessageParser';

export class UnreadForumsCountMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UnreadForumsCountMessageParser);
    }

    public getParser(): UnreadForumsCountMessageParser
    {
        return this.parser as UnreadForumsCountMessageParser;
    }
}
