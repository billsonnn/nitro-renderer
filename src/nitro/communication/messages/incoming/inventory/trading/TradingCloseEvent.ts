import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { TradingCloseParser } from '../../../parser';

export class TradingCloseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingCloseParser);
    }

    public get userID(): number
    {
        return this.getParser().userID;
    }

    public getParser(): TradingCloseParser
    {
        return this.parser as TradingCloseParser;
    }
}
