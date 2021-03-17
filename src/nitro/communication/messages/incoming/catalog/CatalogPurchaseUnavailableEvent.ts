import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPurchaseUnavailableParser } from '../../parser/catalog/CatalogPurchaseUnavailableParser';

export class CatalogPurchaseUnavailableEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPurchaseUnavailableParser);
    }

    public getParser(): CatalogPurchaseUnavailableParser
    {
        return this.parser as CatalogPurchaseUnavailableParser;
    }
}