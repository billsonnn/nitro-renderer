import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { MarketplaceSellItemParser } from '../../../parser/inventory/marketplace/MarketplaceSellItemParser';

export class MarketplaceSellItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MarketplaceSellItemParser);
    }

    public getParser(): MarketplaceSellItemParser
    {
        return this.parser as MarketplaceSellItemParser;
    }
}
