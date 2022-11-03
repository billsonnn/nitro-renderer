import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { QuestCancelledMessageParser } from '../../parser';

export class QuestCancelledMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestCancelledMessageParser);
    }

    public getParser(): QuestCancelledMessageParser
    {
        return this.parser as QuestCancelledMessageParser;
    }
}
