import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { TradingOpenFailedParser } from '../../../parser';

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
