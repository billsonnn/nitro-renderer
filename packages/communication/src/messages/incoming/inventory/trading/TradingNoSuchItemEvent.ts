import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { TradingNoSuchItemParser } from '../../../parser';

export class TradingNoSuchItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingNoSuchItemParser);
    }

    public getParser(): TradingNoSuchItemParser
    {
        return this.parser as TradingNoSuchItemParser;
    }
}
