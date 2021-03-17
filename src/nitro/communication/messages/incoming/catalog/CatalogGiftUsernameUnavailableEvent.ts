import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogGiftUsernameUnavailableParser } from '../../parser/catalog/CatalogGiftUsernameUnavailableParser';

export class CatalogGiftUsernameUnavailableEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogGiftUsernameUnavailableParser);
    }

    public getParser(): CatalogGiftUsernameUnavailableParser
    {
        return this.parser as CatalogGiftUsernameUnavailableParser;
    }
}
