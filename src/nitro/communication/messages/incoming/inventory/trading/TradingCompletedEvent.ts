import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingCompletedParser } from '../../../parser/inventory/trading/TradingCompletedParser';

export class TradingCompletedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingCompletedParser);
    }

    public getParser(): TradingCompletedParser
    {
        return this.parser as TradingCompletedParser;
    }
}
