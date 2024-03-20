import { IMessageDataWrapper } from '@nitrots/api';

export class ClubOfferData
{
    private _offerId: number;
    private _productCode: string;
    private _priceCredits: number;
    private _priceActivityPoints: number;
    private _priceActivityPointsType: number;
    private _vip: boolean;
    private _months: number;
    private _extraDays: number;
    private _daysLeftAfterPurchase: number;
    private _year: number;
    private _month: number;
    private _day: number;
    private _giftable: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._offerId = wrapper.readInt();
        this._productCode = wrapper.readString();

        wrapper.readBoolean();

        this._priceCredits = wrapper.readInt();
        this._priceActivityPoints = wrapper.readInt();
        this._priceActivityPointsType = wrapper.readInt();
        this._vip = wrapper.readBoolean();
        this._months = wrapper.readInt();
        this._extraDays = wrapper.readInt();
        this._giftable = wrapper.readBoolean();
        this._daysLeftAfterPurchase = wrapper.readInt();
        this._year = wrapper.readInt();
        this._month = wrapper.readInt();
        this._day = wrapper.readInt();
    }

    public get offerId(): number
    {
        return this._offerId;
    }

    public get productCode(): string
    {
        return this._productCode;
    }

    public get priceCredits(): number
    {
        return this._priceCredits;
    }

    public get priceActivityPoints(): number
    {
        return this._priceActivityPoints;
    }

    public get priceActivityPointsType(): number
    {
        return this._priceActivityPointsType;
    }

    public get vip(): boolean
    {
        return this._vip;
    }

    public get months(): number
    {
        return this._months;
    }

    public get extraDays(): number
    {
        return this._extraDays;
    }

    public get daysLeftAfterPurchase(): number
    {
        return this._daysLeftAfterPurchase;
    }

    public get year(): number
    {
        return this._year;
    }

    public get month(): number
    {
        return this._month;
    }

    public get day(): number
    {
        return this._day;
    }

    public get giftable(): boolean
    {
        return this._giftable;
    }
}
