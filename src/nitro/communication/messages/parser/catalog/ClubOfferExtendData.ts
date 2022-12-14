import { IMessageDataWrapper } from '../../../../../api';
import { ClubOfferData } from './ClubOfferData';

export class ClubOfferExtendData extends ClubOfferData
{
    private _originalPrice: number;
    private _originalActivityPointPrice: number;
    private _originalActivityPointType: number;
    private _subscriptionDaysLeft: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        super(wrapper);

        this._originalPrice = wrapper.readInt();
        this._originalActivityPointPrice = wrapper.readInt();
        this._originalActivityPointType = wrapper.readInt();
        this._subscriptionDaysLeft = wrapper.readInt();
    }

    public get originalPrice(): number
    {
        return this._originalPrice * this.months;
    }

    public get originalActivityPointPrice(): number
    {
        return this._originalActivityPointPrice * this.months;
    }

    public get originalActivityPointType(): number
    {
        return this._originalActivityPointType;
    }

    public get discountCreditAmount(): number
    {
        return (this._originalPrice * this.months) - this.priceCredits;
    }

    public get discountActivityPointAmount(): number
    {
        return (this.originalActivityPointPrice * this.months) - this.priceActivityPoints;
    }

    public get subscriptionDaysLeft(): number
    {
        return this._subscriptionDaysLeft;
    }
}
