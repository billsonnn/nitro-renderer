import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogClubGiftsParser } from '../../parser/catalog/CatalogClubGiftsParser';

export class CatalogClubGiftsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogClubGiftsParser);
    }

    public getParser(): CatalogClubGiftsParser
    {
        return this.parser as CatalogClubGiftsParser;
    }
}
