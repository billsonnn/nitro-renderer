import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PurchaseNotAllowedMessageParser } from '../../parser';

export class PurchaseNotAllowedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PurchaseNotAllowedMessageParser);
    }

    public getParser(): PurchaseNotAllowedMessageParser
    {
        return this.parser as PurchaseNotAllowedMessageParser;
    }
}
