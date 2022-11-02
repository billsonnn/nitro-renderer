import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { MarketplaceConfigurationMessageParser } from '../../parser';

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
