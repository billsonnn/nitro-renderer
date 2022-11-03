import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { JoinedQueueMessageParser } from '../../../parser/game/lobby';

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
