import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { TradingConfirmationParser } from '../../../parser';

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
