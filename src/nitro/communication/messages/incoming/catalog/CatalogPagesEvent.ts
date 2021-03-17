import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPagesParser } from '../../parser/catalog/CatalogPagesParser';

export class CatalogPagesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPagesParser);
    }

    public getParser(): CatalogPagesParser
    {
        return this.parser as CatalogPagesParser;
    }
}