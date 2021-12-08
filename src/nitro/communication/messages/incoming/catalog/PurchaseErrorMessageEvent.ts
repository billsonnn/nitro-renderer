import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PurchaseErrorMessageParser } from '../../parser';

export class PurchaseErrorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PurchaseErrorMessageParser);
    }

    public getParser(): PurchaseErrorMessageParser
    {
        return this.parser as PurchaseErrorMessageParser;
    }
}
