import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingAcceptParser } from '../../../parser/inventory/trading/TradingAcceptParser';

export class TradingAcceptEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingAcceptParser);
    }

    public get userID(): number
    {
        return this.getParser().userID;
    }

    public get userAccepts(): boolean
    {
        return this.getParser().userAccepts;
    }

    public getParser(): TradingAcceptParser
    {
        return this.parser as TradingAcceptParser;
    }
}
