import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { ItemDataStructure } from './ItemDataStructure';

export class TradingListItemParser implements IMessageParser
{
    private _firstUserID: number;
    private _firstUserItemArray: ItemDataStructure[];
    private _firstUserNumItems: number;
    private _firstUserNumCredits: number;
    private _secondUserID: number;
    private _secondUserItemArray: ItemDataStructure[];
    private _secondUserNumItems: number;
    private _secondUserNumCredits: number;

    public flush(): boolean
    {
        this._firstUserID = -1;
        this._firstUserItemArray = null;
        this._firstUserNumItems = 0;
        this._firstUserNumCredits = 0;
        this._secondUserID = -1;
        this._secondUserItemArray = null;
        this._secondUserNumItems = 0;
        this._secondUserNumCredits = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._firstUserID = wrapper.readInt();
        this._firstUserItemArray = [];

        if(!this.parseItems(wrapper, this._firstUserItemArray)) return false;

        this._firstUserNumItems = wrapper.readInt();
        this._firstUserNumCredits = wrapper.readInt();

        this._secondUserID = wrapper.readInt();
        this._secondUserItemArray = [];

        if(!this.parseItems(wrapper, this._secondUserItemArray)) return false;

        this._secondUserNumItems = wrapper.readInt();
        this._secondUserNumCredits = wrapper.readInt();

        return true;
    }

    private parseItems(k: IMessageDataWrapper, itemArray: ItemDataStructure[]): boolean
    {
        let count = k.readInt();

        while(count > 0)
        {
            itemArray.push(new ItemDataStructure(k));

            count--;
        }

        return true;
    }

    public get firstUserID(): number
    {
        return this._firstUserID;
    }

    public get firstUserItemArray(): ItemDataStructure[]
    {
        return this._firstUserItemArray;
    }

    public get firstUserNumItems(): number
    {
        return this._firstUserNumItems;
    }

    public get firstUserNumCredits(): number
    {
        return this._firstUserNumCredits;
    }

    public get secondUserID(): number
    {
        return this._secondUserID;
    }

    public get secondUserItemArray(): ItemDataStructure[]
    {
        return this._secondUserItemArray;
    }

    public get secondUserNumItems(): number
    {
        return this._secondUserNumItems;
    }

    public get secondUserNumCredits(): number
    {
        return this._secondUserNumCredits;
    }
}
