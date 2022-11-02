import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { GroupMemberParser } from './utils';

export class GroupMembersParser implements IMessageParser
{
    private _groupId: number;
    private _groupTitle: string;
    private _roomId: number;
    private _badge: string;
    private _totalMembersCount: number;
    private _result: GroupMemberParser[];
    private _admin: boolean;
    private _pageSize: number;
    private _pageIndex: number;
    private _level: number;
    private _query: string;

    public flush(): boolean
    {
        this._groupId = 0;
        this._groupTitle = null;
        this._roomId = 0;
        this._badge = null;
        this._totalMembersCount = 0;
        this._result = [];
        this._admin = false;
        this._pageSize = 0;
        this._pageIndex = 0;
        this._level = 0;
        this._query = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._groupId = wrapper.readInt();
        this._groupTitle = wrapper.readString();
        this._roomId = wrapper.readInt();
        this._badge = wrapper.readString();
        this._totalMembersCount = wrapper.readInt();

        let resultCount = wrapper.readInt();

        while(resultCount > 0)
        {
            this._result.push(new GroupMemberParser(wrapper));

            resultCount--;
        }

        this._admin = wrapper.readBoolean();
        this._pageSize = wrapper.readInt();
        this._pageIndex = wrapper.readInt();
        this._level = wrapper.readInt();
        this._query = wrapper.readString();

        return true;
    }

    public get groupId(): number
    {
        return this._groupId;
    }
    public get groupTitle(): string
    {
        return this._groupTitle;
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get badge(): string
    {
        return this._badge;
    }

    public get totalMembersCount(): number
    {
        return this._totalMembersCount;
    }

    public get result(): GroupMemberParser[]
    {
        return this._result;
    }

    public get admin(): boolean
    {
        return this._admin;
    }

    public get pageSize(): number
    {
        return this._pageSize;
    }

    public get pageIndex(): number
    {
        return this._pageIndex;
    }

    public get level(): number
    {
        return this._level;
    }

    public get query(): string
    {
        return this._query;
    }
}
