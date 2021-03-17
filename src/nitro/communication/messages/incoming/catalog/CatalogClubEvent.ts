import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogClubParser } from '../../parser/catalog/CatalogClubParser';

export class CatalogClubEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogClubParser);
    }

    public getParser(): CatalogClubParser
    {
        return this.parser as CatalogClubParser;
    }
}
