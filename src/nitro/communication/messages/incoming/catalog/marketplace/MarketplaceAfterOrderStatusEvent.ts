import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { MarketplaceAfterOrderParser } from '../../../parser/catalog/marketplace/MarketplaceAfterOrderParser';

export class MarketplaceAfterOrderStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceAfterOrderParser);
    }

    public getParser(): MarketplaceAfterOrderParser
    {
        return this.parser as MarketplaceAfterOrderParser;
    }
}
