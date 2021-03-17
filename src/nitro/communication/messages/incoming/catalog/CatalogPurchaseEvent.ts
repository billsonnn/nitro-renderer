import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPurchaseParser } from '../../parser/catalog/CatalogPurchaseParser';

export class CatalogPurchaseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPurchaseParser);
    }

    public getParser(): CatalogPurchaseParser
    {
        return this.parser as CatalogPurchaseParser;
    }
}