import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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
