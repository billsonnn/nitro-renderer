import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogGroupsParser } from '../../parser/catalog/CatalogGroupsParser';

export class CatalogGroupsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogGroupsParser);
    }

    public getParser(): CatalogGroupsParser
    {
        return this.parser as CatalogGroupsParser;
    }
}
