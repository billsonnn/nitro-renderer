import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class MarketplaceItemStatsParser implements IMessageParser
{
    private _averagePrice: number;
    private _currentOfferCount: number;
    private _historyLength: number;
    private _dayOffsets: number[];
    private _averagePrices: number[];
    private _soldAmounts: number[];
    private _furniTypeId: number;
    private _furniCategoryId: number;

    public flush(): boolean
    {
        this._averagePrice = 0;
        this._currentOfferCount = 0;
        this._historyLength = 0;
        this._dayOffsets = [];
        this._averagePrices = [];
        this._soldAmounts = [];
        this._furniTypeId = 0;
        this._furniCategoryId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._averagePrice = wrapper.readInt();
        this._currentOfferCount = wrapper.readInt();
        this._historyLength = wrapper.readInt();

        let count = wrapper.readInt();

        while(count > 0)
        {
            this._dayOffsets.push(wrapper.readInt());
            this._averagePrices.push(wrapper.readInt());
            this._soldAmounts.push(wrapper.readInt());

            count--;
        }

        this._furniCategoryId = wrapper.readInt();
        this._furniTypeId = wrapper.readInt();

        return true;
    }

    public get averagePrice(): number
    {
        return this._averagePrice;
    }

    public get offerCount(): number
    {
        return this._currentOfferCount;
    }

    public get historyLength(): number
    {
        return this._historyLength;
    }

    public get dayOffsets(): number[]
    {
        return this._dayOffsets;
    }

    public get averagePrices(): number[]
    {
        return this._averagePrices;
    }

    public get soldAmounts(): number[]
    {
        return this._soldAmounts;
    }

    public get furniTypeId(): number
    {
        return this._furniTypeId;
    }

    public get furniCategoryId(): number
    {
        return this._furniCategoryId;
    }
}
