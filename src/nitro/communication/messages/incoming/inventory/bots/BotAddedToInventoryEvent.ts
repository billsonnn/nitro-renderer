import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { BotAddedToInventoryParser } from '../../../parser/inventory/bots/BotAddedToInventoryParser';

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
