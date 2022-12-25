import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { OfferRewardDeliveredMessageParser } from '../../parser';

export class OfferRewardDeliveredMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OfferRewardDeliveredMessageParser);
    }

    public getParser(): OfferRewardDeliveredMessageParser
    {
        return this.parser as OfferRewardDeliveredMessageParser;
    }
}
