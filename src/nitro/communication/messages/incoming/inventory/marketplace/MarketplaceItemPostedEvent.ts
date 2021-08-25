import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
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
