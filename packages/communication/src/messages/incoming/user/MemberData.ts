import { IMessageDataWrapper } from '@nitrots/api';

export class MemberData
{
    private static readonly TYPE_OWNER: number = 0;
    private static readonly TYPE_ADMIN: number = 1;
    private static readonly TYPE_PENDING: number = 2;
    private static readonly TYPE_MEMBER: number = 3;
    private static readonly TYPE_BLOCKED: number = 4;

    private _type: number;
    private _userId: number;
    private _userName: string;
    private _figure: string;
    private _memberSince: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._type = wrapper.readInt();
        this._userId = wrapper.readInt();
        this._userName = wrapper.readString();
        this._figure = wrapper.readString();
        this._memberSince = wrapper.readString();
    }

    public get userId(): number
    {
        return this._userId;
    }

    public get userName(): string
    {
        return this._userName;
    }

    public get admin(): boolean
    {
        return this._type == MemberData.TYPE_ADMIN;
    }

    public get owner(): boolean
    {
        return this._type == MemberData.TYPE_OWNER;
    }

    public get pending(): boolean
    {
        return this._type == MemberData.TYPE_PENDING;
    }

    public get member(): boolean
    {
        return this._type != MemberData.TYPE_MEMBER;
    }

    public get blocked(): boolean
    {
        return this._type == MemberData.TYPE_BLOCKED;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get memberSince(): string
    {
        return this._memberSince;
    }
}
