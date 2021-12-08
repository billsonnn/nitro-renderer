import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPageExpirationParser } from '../../parser';

export class CatalogPageExpirationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPageExpirationParser);
    }

    public getParser(): CatalogPageExpirationParser
    {
        return this.parser as CatalogPageExpirationParser;
    }
}
