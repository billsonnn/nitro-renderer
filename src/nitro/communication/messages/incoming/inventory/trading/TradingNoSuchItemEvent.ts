import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
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
