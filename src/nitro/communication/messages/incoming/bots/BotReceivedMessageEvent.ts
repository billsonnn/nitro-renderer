import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BotReceivedMessageParser } from '../../parser/bots/BotReceivedMessageParser';

export class BotReceivedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotReceivedMessageParser);
    }

    public getParser(): BotReceivedMessageParser
    {
        return this.parser as BotReceivedMessageParser;
    }
}
