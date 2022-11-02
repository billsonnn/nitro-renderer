import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';

export class UserSubscriptionParser implements IMessageParser
{
    public static readonly RESPONSE_TYPE_LOGIN: number = 1;
    public static readonly RESPONSE_TYPE_PURCHASE: number = 2;
    public static readonly RESPONSE_TYPE_DISCOUNT_AVAILABLE: number = 3;
    public static readonly RESPONSE_TYPE_CITIZENSHIP_DISCOUNT: number = 4;

    private _productName: string;
    private _daysToPeriodEnd: number;
    private _memberPeriods: number;
    private _periodsSubscribedAhead: number;
    private _responseType: number;
    private _hasEverBeenMember: boolean;
    private _isVip: boolean;
    private _pastClubDays: number;
    private _pastVipDays: number;
    private _minutesUntilExpiration: number;
    private _minutesSinceLastModified: number;

    public flush(): boolean
    {
        this._productName = null;
        this._daysToPeriodEnd = 0;
        this._memberPeriods = 0;
        this._periodsSubscribedAhead = 0;
        this._responseType = 0;
        this._hasEverBeenMember = false;
        this._isVip = false;
        this._pastClubDays = 0;
        this._pastVipDays = 0;
        this._minutesUntilExpiration = 0;
        this._minutesSinceLastModified = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._productName = wrapper.readString();
        this._daysToPeriodEnd = wrapper.readInt();
        this._memberPeriods = wrapper.readInt();
        this._periodsSubscribedAhead = wrapper.readInt();
        this._responseType = wrapper.readInt();
        this._hasEverBeenMember = wrapper.readBoolean();
        this._isVip = wrapper.readBoolean();
        this._pastClubDays = wrapper.readInt();
        this._pastVipDays = wrapper.readInt();
        this._minutesUntilExpiration = wrapper.readInt();

        if(wrapper.bytesAvailable) this._minutesSinceLastModified = wrapper.readInt();

        return true;
    }

    public get productName(): string
    {
        return this._productName;
    }

    public get daysToPeriodEnd(): number
    {
        return this._daysToPeriodEnd;
    }

    public get memberPeriods(): number
    {
        return this._memberPeriods;
    }

    public get periodsSubscribedAhead(): number
    {
        return this._periodsSubscribedAhead;
    }

    public get responseType(): number
    {
        return this._responseType;
    }

    public get hasEverBeenMember(): boolean
    {
        return this._hasEverBeenMember;
    }

    public get isVip(): boolean
    {
        return this._isVip;
    }

    public get pastClubDays(): number
    {
        return this._pastClubDays;
    }

    public get pastVipDays(): number
    {
        return this._pastVipDays;
    }

    public get minutesUntilExpiration(): number
    {
        return this._minutesUntilExpiration;
    }

    public get minutesSinceLastModified(): number
    {
        return this._minutesSinceLastModified;
    }
}
