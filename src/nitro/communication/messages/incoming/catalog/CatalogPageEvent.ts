import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPageParser } from '../../parser/catalog/CatalogPageParser';

export class CatalogPageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPageParser);
    }

    public getParser(): CatalogPageParser
    {
        return this.parser as CatalogPageParser;
    }
}