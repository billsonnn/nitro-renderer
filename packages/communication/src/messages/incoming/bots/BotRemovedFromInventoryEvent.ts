import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { BotRemovedFromInventoryParser } from '../../parser';

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
