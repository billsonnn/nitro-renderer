import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class CatalogClubOfferData
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

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._offerId                   = -1;
        this._productCode               = null;
        this._priceCredits              = 0;
        this._priceActivityPoints       = 0;
        this._priceActivityPointsType   = 0;
        this._vip                       = false;
        this._months                    = 0;
        this._extraDays                 = 0;
        this._daysLeftAfterPurchase     = 0;
        this._year                      = 0;
        this._month                     = 0;
        this._day                       = 0;
        this._giftable                  = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._offerId       = wrapper.readInt();
        this._productCode   = wrapper.readString();

        wrapper.readBoolean();

        this._priceCredits              = wrapper.readInt();
        this._priceActivityPoints       = wrapper.readInt();
        this._priceActivityPointsType   = wrapper.readInt();
        this._vip                       = wrapper.readBoolean();
        this._months                    = wrapper.readInt();
        this._extraDays                 = wrapper.readInt();
        this._giftable                  = wrapper.readBoolean();
        this._daysLeftAfterPurchase     = wrapper.readInt();
        this._year                      = wrapper.readInt();
        this._month                     = wrapper.readInt();
        this._day                       = wrapper.readInt();

        return true;
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