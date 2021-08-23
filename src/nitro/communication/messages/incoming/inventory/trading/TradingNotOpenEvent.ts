import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { TradingNotOpenParser } from '../../../parser/inventory/trading/TradingNotOpenParser';

export class TradingNotOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingNotOpenParser);
    }

    public getParser(): TradingNotOpenParser
    {
        return this.parser as TradingNotOpenParser;
    }
}
