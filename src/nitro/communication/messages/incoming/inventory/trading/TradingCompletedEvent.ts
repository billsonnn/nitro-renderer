import { IMessageEvent, MessageEvent } from '../../../../../../core';
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
