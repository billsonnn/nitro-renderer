import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { MarketplaceItemStatsParser } from '../../parser';

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
