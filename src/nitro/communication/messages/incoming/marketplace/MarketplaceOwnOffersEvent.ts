import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MarketplaceOwnOffersParser } from '../../parser/marketplace/MarketplaceOwnOffersParser';

export class MarketplaceOwnOffersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceOwnOffersParser);
    }

    public getParser(): MarketplaceOwnOffersParser
    {
        return this.parser as MarketplaceOwnOffersParser;
    }
}
