import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { TradingYouAreNotAllowedParser } from '../../../parser';

export class TradingYouAreNotAllowedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingYouAreNotAllowedParser);
    }

    public getParser(): TradingYouAreNotAllowedParser
    {
        return this.parser as TradingYouAreNotAllowedParser;
    }
}
