import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { QuestCompletedMessageParser } from '../../parser';

export class QuestCompletedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestCompletedMessageParser);
    }

    public getParser(): QuestCompletedMessageParser
    {
        return this.parser as QuestCompletedMessageParser;
    }
}
