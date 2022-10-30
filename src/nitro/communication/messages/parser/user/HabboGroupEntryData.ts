import { IMessageDataWrapper } from '../../../../../api';

export class HabboGroupEntryData
{
    private _groupId: number;
    private _groupName: string;
    private _badgeCode: string;
    private _colorA: string;
    private _colorB: string;
    private _favourite: boolean;
    private _ownerId: number;
    private _hasForum: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._groupId = wrapper.readInt();
        this._groupName = wrapper.readString();
        this._badgeCode = wrapper.readString();
        this._colorA = wrapper.readString();
        this._colorB = wrapper.readString();
        this._favourite = wrapper.readBoolean();
        this._ownerId = wrapper.readInt();
        this._hasForum = wrapper.readBoolean();
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

    public get colorA(): string
    {
        return this._colorA;
    }

    public get colorB(): string
    {
        return this._colorB;
    }

    public get favourite(): boolean
    {
        return this._favourite;
    }

    public get ownerId(): number
    {
        return this._ownerId;
    }

    public get hasForum(): boolean
    {
        return this._hasForum;
    }
}
