import { IMessageDataWrapper } from '../../../../../api';

export class FriendParser
{
    private _id: number;
    private _name: string;
    private _gender: number;
    private _online: boolean;
    private _followingAllowed: boolean;
    private _figure: string;
    private _categoryId: number;
    private _motto: string;
    private _realName: string;
    private _lastAccess: string;
    private _persistedMessageUser: boolean;
    private _vipMember: boolean;
    private _pocketHabboUser: boolean;
    private _relationshipStatus: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._gender = wrapper.readInt();
        this._online = wrapper.readBoolean();
        this._followingAllowed = wrapper.readBoolean();
        this._figure = wrapper.readString();
        this._categoryId = wrapper.readInt();
        this._motto = wrapper.readString();
        this._realName = wrapper.readString();
        this._lastAccess = wrapper.readString();
        this._persistedMessageUser = wrapper.readBoolean();
        this._vipMember = wrapper.readBoolean();
        this._pocketHabboUser = wrapper.readBoolean();
        this._relationshipStatus = wrapper.readShort();
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get gender(): number
    {
        return this._gender;
    }

    public get online(): boolean
    {
        return this._online;
    }

    public get followingAllowed(): boolean
    {
        return this._followingAllowed;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get categoryId(): number
    {
        return this._categoryId;
    }

    public get motto(): string
    {
        return this._motto;
    }

    public get lastAccess(): string
    {
        return this._lastAccess;
    }

    public get realName(): string
    {
        return this._realName;
    }

    public get persistedMessageUser(): boolean
    {
        return this._persistedMessageUser;
    }

    public get vipMember(): boolean
    {
        return this._vipMember;
    }

    public get pocketHabboUser(): boolean
    {
        return this._pocketHabboUser;
    }

    public get relationshipStatus(): number
    {
        return this._relationshipStatus;
    }
}
