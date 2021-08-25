import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogIndexMessageParser } from '../../parser';

export class CatalogPagesListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogIndexMessageParser);
    }

    public getParser(): CatalogIndexMessageParser
    {
        return this.parser as CatalogIndexMessageParser;
    }
}
