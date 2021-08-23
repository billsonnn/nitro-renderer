import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { MarketplaceOffersReceivedParser } from '../../../parser/catalog/marketplace/MarketplaceOffersReceivedParser';


export class MarketplaceOffersReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceOffersReceivedParser);
    }

    public getParser(): MarketplaceOffersReceivedParser
    {
        return this.parser as MarketplaceOffersReceivedParser;
    }
}
