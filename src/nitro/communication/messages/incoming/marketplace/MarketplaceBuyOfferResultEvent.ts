import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { MarketplaceBuyOfferResultParser } from '../../parser';


export class MarketplaceBuyOfferResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceBuyOfferResultParser);
    }

    public getParser(): MarketplaceBuyOfferResultParser
    {
        return this.parser as MarketplaceBuyOfferResultParser;
    }
}
