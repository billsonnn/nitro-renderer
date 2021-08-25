import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestCompletedMessageParser } from '../../parser/quest/QuestCompletedMessageParser';

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
