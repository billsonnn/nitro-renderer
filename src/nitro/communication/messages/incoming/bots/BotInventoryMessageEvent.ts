import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BotInventoryMessageParser } from '../../parser/bots/BotInventoryMessageParser';

export class BotInventoryMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotInventoryMessageParser);
    }

    public getParser(): BotInventoryMessageParser
    {
        return this.parser as BotInventoryMessageParser;
    }
}
