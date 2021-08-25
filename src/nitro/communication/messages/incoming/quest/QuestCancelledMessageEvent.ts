import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestCancelledMessageParser } from '../../parser/quest/QuestCancelledMessageParser';

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
