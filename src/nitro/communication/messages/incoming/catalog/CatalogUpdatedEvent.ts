import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogUpdatedParser } from '../../parser/catalog/CatalogUpdatedParser';

export class CatalogUpdatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogUpdatedParser);
    }

    public getParser(): CatalogUpdatedParser
    {
        return this.parser as CatalogUpdatedParser;
    }
}