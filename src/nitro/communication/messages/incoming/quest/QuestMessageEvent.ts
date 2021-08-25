import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { QuestMessageParser } from '../../parser/quest/QuestMessageParser';

export class QuestMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestMessageParser);
    }

    public getParser(): QuestMessageParser
    {
        return this.parser as QuestMessageParser;
    }
}
