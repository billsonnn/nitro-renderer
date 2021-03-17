import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingListItemParser } from '../../../parser/inventory/trading/TradingListItemParser';
import { TradingListItem } from './TradingListItem';

export class TradingListItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingListItemParser);
    }

    public get _Str_15162(): number
    {
        return this.getParser()._Str_15162;
    }

    public get _Str_18215(): number
    {
        return this.getParser()._Str_18215;
    }

    public get _Str_14946(): number
    {
        return this.getParser()._Str_14946;
    }

    public get _Str_13801(): number
    {
        return this.getParser()._Str_13801;
    }

    public get _Str_15709(): number
    {
        return this.getParser()._Str_15709;
    }

    public get _Str_9138(): number
    {
        return this.getParser()._Str_9138;
    }

    public get _Str_17841(): TradingListItem[]
    {
        return this.getParser()._Str_17841;
    }

    public get _Str_17465(): TradingListItem[]
    {
        return this.getParser()._Str_17465;
    }

    public getParser(): TradingListItemParser
    {
        return this.parser as TradingListItemParser;
    }
}