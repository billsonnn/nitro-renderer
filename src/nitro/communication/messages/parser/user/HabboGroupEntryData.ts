import { IMessageDataWrapper } from '../../../../../core';

export class HabboGroupEntryData
{
    private _groupId: number;
    private _groupName: string;
    private _badgeCode: string;
    private _Str_6751: string;
    private _Str_6979: string;
    private _favourite: boolean;
    private _ownerId: number;
    private _Str_19808: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._groupId = wrapper.readInt();
        this._groupName = wrapper.readString();
        this._badgeCode = wrapper.readString();
        this._Str_6751 = wrapper.readString();
        this._Str_6979 = wrapper.readString();
        this._favourite = wrapper.readBoolean();
        this._ownerId = wrapper.readInt();
        this._Str_19808 = wrapper.readBoolean();
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get groupName(): string
    {
        return this._groupName;
    }

    public get badgeCode(): string
    {
        return this._badgeCode;
    }

    public get _Str_5845(): string
    {
        return this._Str_6751;
    }

    public get _Str_6659(): string
    {
        return this._Str_6979;
    }

    public get favourite(): boolean
    {
        return this._favourite;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get _Str_21674(): boolean
    {
        return this._Str_19808;
    }
}
