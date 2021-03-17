import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPurchaseFailedParser } from '../../parser/catalog/CatalogPurchaseFailedParser';

export class CatalogPurchaseFailedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPurchaseFailedParser);
    }

    public getParser(): CatalogPurchaseFailedParser
    {
        return this.parser as CatalogPurchaseFailedParser;
    }
}