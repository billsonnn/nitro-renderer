import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MarketplaceConfigurationMessageParser } from '../../parser/marketplace/MarketplaceConfigurationMessageParser';

export class MarketplaceConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceConfigurationMessageParser);
    }

    public getParser(): MarketplaceConfigurationMessageParser
    {
        return this.parser as MarketplaceConfigurationMessageParser;
    }
}
