import { IMessageDataWrapper } from '../../../../../../../core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from '../../../../../../../core/communication/messages/IMessageParser';

export class UserSubscriptionParser implements IMessageParser
{
    public static _Str_14729: number = 3;

    private _name: string;
    private _days: number;
    private _int1: number;
    private _months: number;
    private _years: number;
    private _hasEverBeenMember: boolean;
    private _isVip: boolean;
    private _pastClubDays: number;
    private _pastVIPDays: number;
    private _totalSeconds: number;

    public flush(): boolean
    {
        this._name          = null;
        this._days          = 0;
        this._int1          = 0;
        this._months        = 0;
        this._years         = 0;
        this._hasEverBeenMember         = false;
        this._isVip         = false;
        this._pastClubDays  = 0;
        this._pastVIPDays          = 0;
        this._totalSeconds  = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._name          = wrapper.readString();
        this._days          = wrapper.readInt();
        this._int1          = wrapper.readInt();
        this._months        = wrapper.readInt();
        this._years         = wrapper.readInt();
        this._hasEverBeenMember         = wrapper.readBoolean();
        this._isVip         = wrapper.readBoolean();
        this._pastClubDays  = wrapper.readInt();
        this._pastVIPDays          = wrapper.readInt();
        this._totalSeconds  = wrapper.readInt();

        return true;
    }

    public get name(): string
    {
        return this._name;
    }

    public get days(): number
    {
        return this._days;
    }

    public get int1(): number
    {
        return this._int1;
    }

    public get months(): number
    {
        return this._months;
    }

    public get years(): number
    {
        return this._years;
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

    public get pastVIPDays(): number
    {
        return this._pastVIPDays;
    }

    public get totalSeconds(): number
    {
        return this._totalSeconds;
    }
}
