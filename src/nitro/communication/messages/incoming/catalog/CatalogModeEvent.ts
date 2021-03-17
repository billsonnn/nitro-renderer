import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CatalogModeParser } from '../../parser/catalog/CatalogModeParser';

export class CatalogModeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CatalogModeParser);
    }

    public getParser(): CatalogModeParser
    {
        return this.parser as CatalogModeParser;
    }
}