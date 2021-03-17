import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingCloseParser } from '../../../parser/inventory/trading/TradingCloseParser';

export class TradingCloseEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingCloseParser);
    }

    public get _Str_4963(): number
    {
        return this.getParser()._Str_4963;
    }

    public getParser(): TradingCloseParser
    {
        return this.parser as TradingCloseParser;
    }
}