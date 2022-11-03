import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { TradingCompletedParser } from '../../../parser';

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
