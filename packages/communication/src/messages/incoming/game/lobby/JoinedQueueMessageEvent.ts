import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { JoinedQueueMessageParser } from '../../../parser';

export class JoinedQueueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, JoinedQueueMessageParser);
    }

    public getParser(): JoinedQueueMessageParser
    {
        return this.parser as JoinedQueueMessageParser;
    }
}
