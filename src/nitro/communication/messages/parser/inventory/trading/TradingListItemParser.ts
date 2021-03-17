import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../core/communication/messages/IMessageParser';
import { TradingListItem } from '../../../incoming/inventory/trading/TradingListItem';

export class TradingListItemParser implements IMessageParser
{
    private _firstUserID: number;
    private _firstUserItemArray: TradingListItem[];
    private _firstUserNumItems: number;
    private _firstUserNumCredits: number;
    private _secondUserID: number;
    private _secondUserItemArray: TradingListItem[];
    private _secondUserNumItems: number;
    private _secondUserNumCredits: number;

    public flush(): boolean
    {
        this._firstUserID           = -1;
        this._firstUserItemArray    = null;
        this._firstUserNumItems     = 0;
        this._firstUserNumCredits   = 0;
        this._secondUserID          = -1;
        this._secondUserItemArray   = null;
        this._secondUserNumItems    = 0;
        this._secondUserNumCredits  = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._firstUserID = wrapper.readInt();
        this._firstUserItemArray = [];

        if(!this.parseItems(wrapper, this._firstUserItemArray)) return false;

        this._firstUserNumItems     = wrapper.readInt();
        this._firstUserNumCredits   = wrapper.readInt();

        this._secondUserID          = wrapper.readInt();
        this._secondUserItemArray   = [];

        if(!this.parseItems(wrapper, this._secondUserItemArray)) return false;

        this._secondUserNumItems    = wrapper.readInt();
        this._secondUserNumCredits  = wrapper.readInt();

        return true;
    }

    private parseItems(k: IMessageDataWrapper, itemArray: TradingListItem[]): boolean
    {
        let count = k.readInt();

        while(count > 0)
        {
            itemArray.push(new TradingListItem(k));

            count--;
        }

        return true;
    }

    public get _Str_15162(): number
    {
        return this._firstUserID;
    }

    public get _Str_17841(): TradingListItem[]
    {
        return this._firstUserItemArray;
    }

    public get _Str_14946(): number
    {
        return this._firstUserNumItems;
    }

    public get _Str_15709(): number
    {
        return this._firstUserNumCredits;
    }

    public get _Str_18215(): number
    {
        return this._secondUserID;
    }

    public get _Str_17465(): TradingListItem[]
    {
        return this._secondUserItemArray;
    }

    public get _Str_13801(): number
    {
        return this._secondUserNumItems;
    }

    public get _Str_9138(): number
    {
        return this._secondUserNumCredits;
    }
}