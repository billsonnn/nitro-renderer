import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
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
