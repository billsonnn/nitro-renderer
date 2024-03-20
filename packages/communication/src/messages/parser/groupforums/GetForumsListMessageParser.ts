import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { ForumData } from './ForumData';

export class GetForumsListMessageParser implements IMessageParser
{
    private _listCode: number;
    private _totalAmount: number;
    private _startIndex: number;
    private _amount: number;
    private _forums: ForumData[];

    public flush(): boolean
    {
        this._listCode = -1;
        this._totalAmount = 0;
        this._startIndex = -1;
        this._amount = 0;
        this._forums = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._listCode = wrapper.readInt();
        this._totalAmount = wrapper.readInt();
        this._startIndex = wrapper.readInt();
        this._amount = wrapper.readInt();
        this._forums = [];

        let i = 0;

        while(i < this._amount)
        {
            this._forums.push(ForumData.parse(wrapper));

            i++;
        }

        return true;
    }

    public get listCode(): number
    {
        return this._listCode;
    }

    public get totalAmount(): number
    {
        return this._totalAmount;
    }

    public get startIndex(): number
    {
        return this._startIndex;
    }

    public get amount(): number
    {
        return this._amount;
    }

    public get forums(): ForumData[]
    {
        return this._forums;
    }
}
