import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MarketplaceItemStatsParser } from '../../parser/marketplace/MarketplaceItemStatsParser';

export class MarketplaceItemStatsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceItemStatsParser);
    }

    public getParser(): MarketplaceItemStatsParser
    {
        return this.parser as MarketplaceItemStatsParser;
    }
}
