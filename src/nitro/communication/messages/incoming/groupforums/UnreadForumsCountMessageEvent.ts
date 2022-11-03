import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UnreadForumsCountMessageParser } from '../../parser';

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
