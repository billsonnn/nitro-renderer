import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPageMessageParser } from '../../parser/catalog/CatalogPageMessageParser';

export class CatalogPageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPageMessageParser);
    }

    public getParser(): CatalogPageMessageParser
    {
        return this.parser as CatalogPageMessageParser;
    }
}
