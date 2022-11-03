import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { TradingOpenParser } from '../../../parser';

export class TradingOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOpenParser);
    }

    public get userID(): number
    {
        return this.getParser().userID;
    }

    public get userCanTrade(): boolean
    {
        return this.getParser().userCanTrade;
    }

    public get otherUserID(): number
    {
        return this.getParser().otherUserID;
    }

    public get otherUserCanTrade(): boolean
    {
        return this.getParser().otherUserCanTrade;
    }

    public getParser(): TradingOpenParser
    {
        return this.parser as TradingOpenParser;
    }
}
