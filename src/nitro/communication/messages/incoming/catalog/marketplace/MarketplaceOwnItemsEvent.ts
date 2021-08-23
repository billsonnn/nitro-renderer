import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { MarketplaceOwnItemsParser } from '../../../parser/catalog/marketplace/MarketplaceOwnItemsParser';

export class MarketplaceOwnItemsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceOwnItemsParser);
    }

    public getParser(): MarketplaceOwnItemsParser
    {
        return this.parser as MarketplaceOwnItemsParser;
    }
}
