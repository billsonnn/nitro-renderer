import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { BotInventoryParser } from '../../../parser/inventory/bots/BotReceivedMessageParser';

export class BotInventoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotInventoryParser);
    }

    public getParser(): BotInventoryParser
    {
        return this.parser as BotInventoryParser;
    }
}
