import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogSearchParser } from '../../parser/catalog/CatalogSearchParser';

export class CatalogSearchEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogSearchParser);
    }

    public getParser(): CatalogSearchParser
    {
        return this.parser as CatalogSearchParser;
    }
}