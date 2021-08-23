import { IMessageEvent, MessageEvent } from '../../../../../../core';
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
