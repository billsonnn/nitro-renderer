import { IMessageDataWrapper } from '../../../../../api';

export class ModeratorUserInfoData
{
    private _userId: number;
    private _userName: string;
    private _registrationAgeInMinutes: number;
    private _minutesSinceLastLogin: number;
    private _online: boolean;
    private _cfhCount: number;
    private _abusiveCfhCount: number;
    private _cautionCount: number;
    private _banCount: number;
    private _tradingLockCount: number;
    private _tradingExpiryDate: string;
    private _lastPurchaseDate: string;
    private _identityId: number;
    private _identityRelatedBanCount: number;
    private _primaryEmailAddress: string;
    private _figure: string;
    private _userClassification: string;
    private _lastSanctionTime: string = '';
    private _sanctionAgeHours: number = 0;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        this._figure = wrapper.readString();
        this._registrationAgeInMinutes = wrapper.readInt();
        this._minutesSinceLastLogin = wrapper.readInt();
        this._online = wrapper.readBoolean();
        this._cfhCount = wrapper.readInt();
        this._abusiveCfhCount = wrapper.readInt();
        this._cautionCount = wrapper.readInt();
        this._banCount = wrapper.readInt();
        this._tradingLockCount = wrapper.readInt();
        this._tradingExpiryDate = wrapper.readString();
        this._lastPurchaseDate = wrapper.readString();
        this._identityId = wrapper.readInt();
        this._identityRelatedBanCount = wrapper.readInt();
        this._primaryEmailAddress = wrapper.readString();
        this._userClassification = wrapper.readString();
        if(wrapper.bytesAvailable)
        {
            this._lastSanctionTime = wrapper.readString();
            this._sanctionAgeHours = wrapper.readInt();
        }
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get registrationAgeInMinutes(): number
    {
        return this._registrationAgeInMinutes;
    }

    public get minutesSinceLastLogin(): number
    {
        return this._minutesSinceLastLogin;
    }

    public get online(): boolean
    {
        return this._online;
    }

    public get cfhCount(): number
    {
        return this._cfhCount;
    }

    public get abusiveCfhCount(): number
    {
        return this._abusiveCfhCount;
    }

    public get cautionCount(): number
    {
        return this._cautionCount;
    }

    public get banCount(): number
    {
        return this._banCount;
    }

    public get tradingLockCount(): number
    {
        return this._tradingLockCount;
    }

    public get tradingExpiryDate(): string
    {
        return this._tradingExpiryDate;
    }

    public get lastPurchaseDate(): string
    {
        return this._lastPurchaseDate;
    }

    public get identityId(): number
    {
        return this._identityId;
    }

    public get identityRelatedBanCount(): number
    {
        return this._identityRelatedBanCount;
    }

    public get primaryEmailAddress(): string
    {
        return this._primaryEmailAddress;
    }

    public get userClassification(): string
    {
        return this._userClassification;
    }

    public get lastSanctionTime(): string
    {
        return this._lastSanctionTime;
    }

    public get sanctionAgeHours(): number
    {
        return this._sanctionAgeHours;
    }
}
