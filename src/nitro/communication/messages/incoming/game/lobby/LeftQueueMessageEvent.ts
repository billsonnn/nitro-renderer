import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { LeftQueueMessageParser } from '../../../parser';

export class LeftQueueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LeftQueueMessageParser);
    }

    public getParser(): LeftQueueMessageParser
    {
        return this.parser as LeftQueueMessageParser;
    }
}
