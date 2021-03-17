import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogSoldOutParser } from '../../parser/catalog/CatalogSoldOutParser';

export class CatalogSoldOutEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogSoldOutParser);
    }

    public getParser(): CatalogSoldOutParser
    {
        return this.parser as CatalogSoldOutParser;
    }
}