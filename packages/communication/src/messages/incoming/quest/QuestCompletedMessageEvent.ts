import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
