import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { MarketplaceCancelOfferResultParser } from '../../parser';

export class MarketplaceCancelOfferResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceCancelOfferResultParser);
    }

    public getParser(): MarketplaceCancelOfferResultParser
    {
        return this.parser as MarketplaceCancelOfferResultParser;
    }
}
