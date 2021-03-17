import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BotErrorEventParser } from '../../parser/notifications/BotErrorEventParser';

export class BotErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotErrorEventParser);
    }

    public getParser(): BotErrorEventParser
    {
        return this.parser as BotErrorEventParser;
    }
}
