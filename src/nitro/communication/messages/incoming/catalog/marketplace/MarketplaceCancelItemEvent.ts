import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { MarketplaceCancelItemParser } from '../../../parser/catalog/marketplace/MarketplaceCancelItemParser';

export class MarketplaceCancelItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceCancelItemParser);
    }

    public getParser(): MarketplaceCancelItemParser
    {
        return this.parser as MarketplaceCancelItemParser;
    }
}
