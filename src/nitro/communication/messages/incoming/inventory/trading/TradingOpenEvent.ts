import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingOpenParser } from '../../../parser/inventory/trading/TradingOpenParser';

export class TradingOpenEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingOpenParser);
    }

    public get _Str_4963(): number
    {
        return this.getParser()._Str_4963;
    }

    public get _Str_16764(): boolean
    {
        return this.getParser()._Str_16764;
    }

    public get _Str_17613(): number
    {
        return this.getParser()._Str_17613;
    }

    public get _Str_13374(): boolean
    {
        return this.getParser()._Str_13374;
    }

    public getParser(): TradingOpenParser
    {
        return this.parser as TradingOpenParser;
    }
}