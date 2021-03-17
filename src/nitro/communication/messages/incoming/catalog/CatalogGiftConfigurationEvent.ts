import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogPagesParser } from '../../parser/catalog/CatalogPagesParser';
import { CatalogGiftConfigurationParser } from '../../parser/catalog/CatalogGiftConfigurationParser';

export class CatalogGiftConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogGiftConfigurationParser);
    }

    public getParser(): CatalogGiftConfigurationParser
    {
        return this.parser as CatalogGiftConfigurationParser;
    }
}
