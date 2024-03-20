import { IMessageDataWrapper } from '@nitrots/api';

export class GuildForumThread
{
    private _threadId: number;
    private _authorId: number;
    private _authorName: string;
    private _creationTimeAsSecondsAgo: number;
    private _header: string;
    private _totalMessages: number;
    private _unreadMessagesCount: number;
    private _lastMessageId: number;
    private _lastUserId: number;
    private _lastUserName: string;
    private _lastCommentTime: number;
    private _state: number;
    private _adminId: number;
    private _adminName: string;
    private _adminOperationTimeAsSecondsAgo: number;
    private _isPinned: boolean;
    private _isLocked: boolean;

    public static parse(wrapper: IMessageDataWrapper): GuildForumThread
    {
        const thread = new GuildForumThread();

        thread._threadId = wrapper.readInt();
        thread._authorId = wrapper.readInt();
        thread._authorName = wrapper.readString();
        thread._header = wrapper.readString();
        thread._isPinned = wrapper.readBoolean();
        thread._isLocked = wrapper.readBoolean();
        thread._creationTimeAsSecondsAgo = wrapper.readInt();
        thread._totalMessages = wrapper.readInt();
        thread._unreadMessagesCount = wrapper.readInt();
        thread._lastMessageId = wrapper.readInt();
        thread._lastUserId = wrapper.readInt();
        thread._lastUserName = wrapper.readString();
        thread._lastCommentTime = wrapper.readInt();
        thread._state = wrapper.readByte();
        thread._adminId = wrapper.readInt();
        thread._adminName = wrapper.readString();
        thread._adminOperationTimeAsSecondsAgo = wrapper.readInt();

        return thread;
    }

    public get adminOperationTimeAsSecondsAgo(): number
    {
        return this._adminOperationTimeAsSecondsAgo;
    }

    public set adminOperationTimeAsSecondsAgo(k: number)
    {
        this._adminOperationTimeAsSecondsAgo = k;
    }

    public get lastCommentTime(): number
    {
        return this._lastCommentTime;
    }

    public set lastCommentTime(time: number)
    {
        this._lastCommentTime = time;
    }

    public get threadId(): number
    {
        return this._threadId;
    }

    public set threadId(id: number)
    {
        this._threadId = id;
    }

    public get authorId(): number
    {
        return this._authorId;
    }

    public set authorId(id: number)
    {
        this._authorId = id;
    }

    public get authorName(): string
    {
        return this._authorName;
    }

    public set authorName(name: string)
    {
        this._authorName = name;
    }

    public get creationTimeAsSecondsAgo(): number
    {
        return this._creationTimeAsSecondsAgo;
    }

    public set creationTimeAsSecondsAgo(time: number)
    {
        this._creationTimeAsSecondsAgo = time;
    }

    public get header(): string
    {
        return this._header;
    }

    public set header(header: string)
    {
        this._header = header;
    }

    public get lastMessageId(): number
    {
        return this._lastMessageId;
    }

    public set lastMessageId(id: number)
    {
        this._lastMessageId = id;
    }

    public get lastUserId(): number
    {
        return this._lastUserId;
    }

    public set lastUserId(id: number)
    {
        this._lastUserId = id;
    }

    public get lastUserName(): string
    {
        return this._lastUserName;
    }

    public set lastUserName(name: string)
    {
        this._lastUserName = name;
    }

    public get totalMessages(): number
    {
        return this._totalMessages;
    }

    public set totalMessages(total: number)
    {
        this._totalMessages = total;
    }

    public get unreadMessagesCount(): number
    {
        return this._unreadMessagesCount;
    }

    public set unreadMessagesCount(count: number)
    {
        this._unreadMessagesCount = count;
    }

    public get state(): number
    {
        return this._state;
    }

    public set state(state: number)
    {
        this._state = state;
    }

    public get adminId(): number
    {
        return this._adminId;
    }

    public set adminId(id: number)
    {
        this._adminId = id;
    }

    public get adminName(): string
    {
        return this._adminName;
    }

    public set adminName(name: string)
    {
        this._adminName = name;
    }

    public get isPinned(): boolean
    {
        return this._isPinned;
    }

    public set isPinned(k: boolean)
    {
        this._isPinned = k;
    }

    public get isLocked(): boolean
    {
        return this._isLocked;
    }

    public set isLocked(flag: boolean)
    {
        this._isLocked = flag;
    }
}
