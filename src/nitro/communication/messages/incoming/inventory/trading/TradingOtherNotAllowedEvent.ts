import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { TradingOtherNotAllowedParser } from '../../../parser';

export class TradingOtherNotAllowedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOtherNotAllowedParser);
    }

    public getParser(): TradingOtherNotAllowedParser
    {
        return this.parser as TradingOtherNotAllowedParser;
    }
}
