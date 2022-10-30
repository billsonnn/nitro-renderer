import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { TradingConfirmationParser } from '../../../parser/inventory/trading/TradingConfirmationParser';

export class TradingConfirmationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingConfirmationParser);
    }

    public getParser(): TradingConfirmationParser
    {
        return this.parser as TradingConfirmationParser;
    }
}
