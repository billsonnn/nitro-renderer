import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CitizenshipVipOfferPromoEnabledMessageParser } from './../../parser';

export class CitizenshipVipOfferPromoEnabledEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CitizenshipVipOfferPromoEnabledMessageParser);
    }

    public getParser(): CitizenshipVipOfferPromoEnabledMessageParser
    {
        return this.parser as CitizenshipVipOfferPromoEnabledMessageParser;
    }
}
