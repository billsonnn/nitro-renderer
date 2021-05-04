import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MarketplaceConfigParser } from '../../parser/catalog/MarketplaceConfigParser';


export class MarketplaceConfigEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceConfigParser);
    }

    public getParser(): MarketplaceConfigParser
    {
        return this.parser as MarketplaceConfigParser;
    }
}
