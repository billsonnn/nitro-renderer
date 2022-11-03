import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CatalogPublishedMessageParser } from '../../parser';

export class CatalogPublishedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogPublishedMessageParser);
    }

    public getParser(): CatalogPublishedMessageParser
    {
        return this.parser as CatalogPublishedMessageParser;
    }
}
