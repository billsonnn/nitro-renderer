import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingOpenFailedParser } from '../../../parser/inventory/trading/TradingOpenFailedParser';

export class TradingOpenFailedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOpenFailedParser);
    }

    public getParser(): TradingOpenFailedParser
    {
        return this.parser as TradingOpenFailedParser;
    }
}
