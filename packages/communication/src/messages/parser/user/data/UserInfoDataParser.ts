import { IMessageDataWrapper } from '@nitrots/api';

export class UserInfoDataParser
{
    private _userId: number;
    private _username: string;
    private _figure: string;
    private _gender: string;
    private _motto: string;
    private _realName: string;
    private _directMail: boolean;
    private _respectsReceived: number;
    private _respectsRemaining: number;
    private _respectsPetRemaining: number;
    private _streamPublishingAllowed: boolean;
    private _lastAccessDate: string;
    private _canChangeName: boolean;
    private _safetyLocked: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._userId = 0;
        this._username = null;
        this._figure = null;
        this._gender = null;
        this._motto = null;
        this._realName = null;
        this._directMail = false;
        this._respectsReceived = 0;
        this._respectsRemaining = 0;
        this._respectsPetRemaining = 0;
        this._streamPublishingAllowed = false;
        this._lastAccessDate = null;
        this._canChangeName = false;
        this._safetyLocked = false;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._userId = wrapper.readInt();
        this._username = wrapper.readString();
        this._figure = wrapper.readString();
        this._gender = wrapper.readString();
        this._motto = wrapper.readString();
        this._realName = wrapper.readString();
        this._directMail = wrapper.readBoolean();
        this._respectsReceived = wrapper.readInt();
        this._respectsRemaining = wrapper.readInt();
        this._respectsPetRemaining = wrapper.readInt();
        this._streamPublishingAllowed = wrapper.readBoolean();
        this._lastAccessDate = wrapper.readString();
        this._canChangeName = wrapper.readBoolean();
        this._safetyLocked = wrapper.readBoolean();

        return true;
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get username(): string
    {
        return this._username;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get gender(): string
    {
        return this._gender;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get realName(): string
    {
        return this._realName;
    }

    public get directMail(): boolean
    {
        return this._directMail;
    }

    public get respectsReceived(): number
    {
        return this._respectsReceived;
    }

    public get respectsRemaining(): number
    {
        return this._respectsRemaining;
    }

    public get respectsPetRemaining(): number
    {
        return this._respectsPetRemaining;
    }

    public get streamPublishingAllowed(): boolean
    {
        return this._streamPublishingAllowed;
    }

    public get lastAccessedDate(): string
    {
        return this._lastAccessDate;
    }

    public get canChangeName(): boolean
    {
        return this._canChangeName;
    }

    public get safetyLocked(): boolean
    {
        return this._safetyLocked;
    }
}
