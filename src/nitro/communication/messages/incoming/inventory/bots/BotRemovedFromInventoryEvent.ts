import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { BotRemovedFromInventoryParser } from '../../../parser/inventory/bots/BotRemovedFromInventoryParser';

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
