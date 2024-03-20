import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
