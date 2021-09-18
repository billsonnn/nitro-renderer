import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BotRemovedFromInventoryParser } from '../../parser/bots/BotRemovedFromInventoryParser';

export class BotRemovedFromInventoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotRemovedFromInventoryParser);
    }

    public getParser(): BotRemovedFromInventoryParser
    {
        return this.parser as BotRemovedFromInventoryParser;
    }
}
