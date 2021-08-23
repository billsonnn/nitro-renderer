import { IMessageEvent, MessageEvent } from '../../../../../core';
import { IsOfferGiftableMessageParser } from '../../parser';

export class IsOfferGiftableMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IsOfferGiftableMessageParser);
    }

    public getParser(): IsOfferGiftableMessageParser
    {
        return this.parser as IsOfferGiftableMessageParser;
    }
}
