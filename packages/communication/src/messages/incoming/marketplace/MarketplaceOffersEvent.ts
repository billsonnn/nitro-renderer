import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { MarketplaceOffersParser } from '../../parser';

export class MarketPlaceOffersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceOffersParser);
    }

    public getParser(): MarketplaceOffersParser
    {
        return this.parser as MarketplaceOffersParser;
    }
}
