import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestDailyMessageParser } from '../../parser/quest/QuestDailyMessageParser';

export class QuestDailyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestDailyMessageParser);
    }

    public getParser(): QuestDailyMessageParser
    {
        return this.parser as QuestDailyMessageParser;
    }
}
