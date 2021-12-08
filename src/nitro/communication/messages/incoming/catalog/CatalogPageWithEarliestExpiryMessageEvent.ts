import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPageWithEarliestExpiryMessageParser } from '../../parser';

export class CatalogPageWithEarliestExpiryMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPageWithEarliestExpiryMessageParser);
    }

    public getParser(): CatalogPageWithEarliestExpiryMessageParser
    {
        return this.parser as CatalogPageWithEarliestExpiryMessageParser;
    }
}
