import { IMessageDataWrapper } from '../../../../../../api';

export class GroupRank
{
    public static readonly OWNER: number = 0;
    public static readonly ADMIN: number = 1;
    public static readonly MEMBER: number = 2;
    public static readonly REQUESTED: number = 3;
    public static readonly DELETED: number = 4;
}

export class GroupMemberParser
{
    private _rank: number;
    private _id: number;
    private _name: string;
    private _figure: string;
    private _joinedAt: string;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._rank = -1;
        this._id = 0;
        this._name = null;
        this._figure = null;
        this._joinedAt = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._rank = wrapper.readInt();
        this._id = wrapper.readInt();
        this._name = wrapper.readString();
        this._figure = wrapper.readString();
        this._joinedAt = wrapper.readString();

        return true;
    }

    public get id(): number
    {
        return this._id;
    }

    public get name(): string
    {
        return this._name;
    }

    public get figure(): string
    {
        return this._figure;
    }

    public get rank(): number
    {
        return this._rank;
    }

    public get joinedAt(): string
    {
        return this._joinedAt;
    }
}
