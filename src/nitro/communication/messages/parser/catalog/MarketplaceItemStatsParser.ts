import { IMessageDataWrapper } from '../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../core/communication/messages/IMessageParser';

export class MarketplaceItemStatsParser implements IMessageParser
{
    private _averagePrice:number;
    private _currentOfferCount:number;
    private _historyLength:number;
    private _dayOffsets:number[];
    private _averagePrices:number[];
    private _soldAmounts:number[];
    private _furniTypeId:number;
    private _furniCategoryId:number;

    public get averagePrice():number
    {
        return this._averagePrice;
    }

    public get offerCount():number
    {
        return this._currentOfferCount;
    }

    public get historyLength():number
    {
        return this._historyLength;
    }

    public get dayOffsets():any[]
    {
        return this._dayOffsets;
    }

    public get averagePrices():any[]
    {
        return this._averagePrices;
    }

    public get soldAmounts():any[]
    {
        return this._soldAmounts;
    }

    public get furniTypeId():number
    {
        return this._furniTypeId;
    }

    public get furniCategoryId():number
    {
        return this._furniCategoryId;
    }

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._averagePrice = wrapper.readInt();
        this._currentOfferCount = wrapper.readInt();
        this._historyLength = wrapper.readInt();

        const count = wrapper.readInt();
        this._dayOffsets = [];
        this._averagePrices = [];
        this._soldAmounts = [];

        for(let i = 0; i < count; i++) 
        {
            this._dayOffsets.push(wrapper.readInt());
            this._averagePrices.push(wrapper.readInt());
            this._soldAmounts.push(wrapper.readInt());
        }
        
        this._furniCategoryId = wrapper.readInt();
        this._furniTypeId = wrapper.readInt();
        return true;
    }


}
