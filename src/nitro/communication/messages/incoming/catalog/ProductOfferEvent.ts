import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ProductOfferMessageParser } from '../../parser';

export class ProductOfferEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ProductOfferMessageParser);
    }

    public getParser(): ProductOfferMessageParser
    {
        return this.parser as ProductOfferMessageParser;
    }
}
