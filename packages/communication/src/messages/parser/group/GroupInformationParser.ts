import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GroupInformationParser implements IMessageParser
{
    private _id: number;
    private _type: number;
    private _title: string;
    private _description: string;
    private _badge: string;
    private _roomId: number;
    private _roomName: string;
    private _membershipType: number;
    private _membersCount: number;
    private _isFavorite: boolean;
    private _createdAt: string;
    private _isOwner: boolean;
    private _isAdmin: boolean;
    private _ownerName: string;
    private _flag: boolean;
    private _canMembersDecorate: boolean;
    private _pendingRequestsCount: number;

    public flush(): boolean
    {
        this._id = 0;
        this._type = 0;
        this._title = null;
        this._description = null;
        this._badge = null;
        this._roomId = 0;
        this._roomName = null;
        this._membershipType = 0;
        this._membersCount = 0;
        this._isFavorite = false;
        this._createdAt = null;
        this._isOwner = false;
        this._isAdmin = false;
        this._ownerName = null;
        this._flag = false;
        this._canMembersDecorate = false;
        this._pendingRequestsCount = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._id = wrapper.readInt();
        wrapper.readBoolean();
        this._type = wrapper.readInt();
        this._title = wrapper.readString();
        this._description = wrapper.readString();
        this._badge = wrapper.readString();
        this._roomId = wrapper.readInt();
        this._roomName = wrapper.readString();
        this._membershipType = wrapper.readInt();
        this._membersCount = wrapper.readInt();
        this._isFavorite = wrapper.readBoolean();
        this._createdAt = wrapper.readString();
        this._isOwner = wrapper.readBoolean();
        this._isAdmin = wrapper.readBoolean();
        this._ownerName = wrapper.readString();
        this._flag = wrapper.readBoolean();
        this._canMembersDecorate = wrapper.readBoolean();
        this._pendingRequestsCount = wrapper.readInt();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get type(): number
    {
        return this._type;
    }

    public get title(): string
    {
        return this._title;
    }

    public get description(): string
    {
        return this._description;
    }

    public get badge(): string
    {
        return this._badge;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public get membershipType(): number
    {
        return this._membershipType;
    }

    public get membersCount(): number
    {
        return this._membersCount;
    }

    public get isFavorite(): boolean
    {
        return this._isFavorite;
    }

    public get createdAt(): string
    {
        return this._createdAt;
    }

    public get isOwner(): boolean
    {
        return this._isOwner;
    }

    public get isAdmin(): boolean
    {
        return this._isAdmin;
    }

    public get ownerName(): string
    {
        return this._ownerName;
    }

    public get flag(): boolean
    {
        return this._flag;
    }

    public get canMembersDecorate(): boolean
    {
        return this._canMembersDecorate;
    }

    public get pendingRequestsCount(): number
    {
        return this._pendingRequestsCount;
    }
}
