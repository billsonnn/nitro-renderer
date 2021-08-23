import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { MarketplaceItemPostedParser } from '../../../parser/inventory/marketplace/MarketplaceItemPostedParser';

export class MarketplaceItemPostedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceItemPostedParser);
    }

    public getParser(): MarketplaceItemPostedParser
    {
        return this.parser as MarketplaceItemPostedParser;
    }
}
