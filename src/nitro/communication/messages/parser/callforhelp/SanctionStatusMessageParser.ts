import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class SanctionStatusMessageParser implements IMessageParser
{
    private _isSanctionNew: boolean;
    private _isSanctionActive: boolean;
    private _sanctionName: string;
    private _sanctionLengthHours: number;
    private _sanctionReason: string;
    private _sanctionCreationTime: string;
    private _probationHoursLeft: number;
    private _nextSanctionName: string;
    private _nextSanctionLengthHours: number;
    private _hasCustomMute: boolean;
    private _tradeLockExpiryTime: string;

    public flush(): boolean
    {
        this._isSanctionNew = false;
        this._isSanctionActive = false;
        this._sanctionName = null;
        this._sanctionLengthHours = 0;
        this._sanctionReason = null;
        this._sanctionCreationTime = null;
        this._probationHoursLeft = 0;
        this._nextSanctionName = null;
        this._nextSanctionLengthHours = 0;
        this._hasCustomMute = false;
        this._tradeLockExpiryTime = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._isSanctionNew = wrapper.readBoolean();
        this._isSanctionActive = wrapper.readBoolean();
        this._sanctionName = wrapper.readString();
        this._sanctionLengthHours = wrapper.readInt();

        wrapper.readInt();

        this._sanctionReason = wrapper.readString();
        this._sanctionCreationTime = wrapper.readString();
        this._probationHoursLeft = wrapper.readInt();
        this._nextSanctionName = wrapper.readString();
        this._nextSanctionLengthHours = wrapper.readInt();

        wrapper.readInt();

        this._hasCustomMute = wrapper.readBoolean();

        if(wrapper.bytesAvailable) this._tradeLockExpiryTime = wrapper.readString();

        return true;
    }

    public get isSanctionNew(): boolean
    {
        return this._isSanctionNew;
    }

    public get isSanctionActive(): boolean
    {
        return this._isSanctionActive;
    }

    public get sanctionName(): string
    {
        return this._sanctionName;
    }

    public get sanctionLengthHours(): number
    {
        return this._sanctionLengthHours;
    }

    public get sanctionReason(): string
    {
        return this._sanctionReason;
    }

    public get sanctionCreationTime(): string
    {
        return this._sanctionCreationTime;
    }

    public get probationHoursLeft(): number
    {
        return this._probationHoursLeft;
    }

    public get nextSanctionName(): string
    {
        return this._nextSanctionName;
    }

    public get nextSanctionLengthHours(): number
    {
        return this._nextSanctionLengthHours;
    }

    public get hasCustomMute(): boolean
    {
        return this._hasCustomMute;
    }

    public get tradeLockExpiryTime(): string
    {
        return this._tradeLockExpiryTime;
    }
}
