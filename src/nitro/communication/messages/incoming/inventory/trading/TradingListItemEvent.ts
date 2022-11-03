import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { ItemDataStructure, TradingListItemParser } from '../../../parser';

export class TradingListItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingListItemParser);
    }

    public get firstUserID(): number
    {
        return this.getParser().firstUserID;
    }

    public get secondUserID(): number
    {
        return this.getParser().secondUserID;
    }

    public get firstUserNumItems(): number
    {
        return this.getParser().firstUserNumItems;
    }

    public get secondUserNumItems(): number
    {
        return this.getParser().secondUserNumItems;
    }

    public get firstUserNumCredits(): number
    {
        return this.getParser().firstUserNumCredits;
    }

    public get secondUserNumCredits(): number
    {
        return this.getParser().secondUserNumCredits;
    }

    public get firstUserItemArray(): ItemDataStructure[]
    {
        return this.getParser().firstUserItemArray;
    }

    public get secondUserItemArray(): ItemDataStructure[]
    {
        return this.getParser().secondUserItemArray;
    }

    public getParser(): TradingListItemParser
    {
        return this.parser as TradingListItemParser;
    }
}
