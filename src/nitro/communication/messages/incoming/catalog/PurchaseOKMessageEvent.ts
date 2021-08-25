import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PurchaseOKMessageParser } from '../../parser';

export class PurchaseOKMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PurchaseOKMessageParser);
    }

    public getParser(): PurchaseOKMessageParser
    {
        return this.parser as PurchaseOKMessageParser;
    }
}
