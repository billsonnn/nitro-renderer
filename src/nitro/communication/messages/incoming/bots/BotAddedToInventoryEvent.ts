import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { BotAddedToInventoryParser } from '../../parser/bots/BotAddedToInventoryParser';

export class BotAddedToInventoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotAddedToInventoryParser);
    }

    public getParser(): BotAddedToInventoryParser
    {
        return this.parser as BotAddedToInventoryParser;
    }
}
