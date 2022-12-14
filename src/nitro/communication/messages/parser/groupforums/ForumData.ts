import { IMessageDataWrapper } from '../../../../../api';
import { GuildForumThread } from './GuildForumThread';

export class ForumData
{
    private _groupId: number;
    private _name: string;
    private _description: string;
    private _icon: string;
    private _totalThreads: number;
    private _leaderboardScore: number;
    private _totalMessages: number;
    private _unreadMessages: number;
    private _lastMessageId: number;
    private _lastMessageAuthorId: number;
    private _lastMessageAuthorName: string;
    private _lastMessageTimeAsSecondsAgo: number;

    public static parse(wrapper: IMessageDataWrapper): ForumData
    {
        return this.fillFromMessage(new ForumData(), wrapper);
    }

    protected static fillFromMessage(data: ForumData, wrapper: IMessageDataWrapper): ForumData
    {
        data._groupId = wrapper.readInt();
        data._name = wrapper.readString();
        data._description = wrapper.readString();
        data._icon = wrapper.readString();
        data._totalThreads = wrapper.readInt();
        data._leaderboardScore = wrapper.readInt();
        data._totalMessages = wrapper.readInt();
        data._unreadMessages = wrapper.readInt();
        data._lastMessageId = wrapper.readInt();
        data._lastMessageAuthorId = wrapper.readInt();
        data._lastMessageAuthorName = wrapper.readString();
        data._lastMessageTimeAsSecondsAgo = wrapper.readInt();

        return data;
    }

    public get groupId(): number
    {
        return this._groupId;
    }

    public get name(): string
    {
        return this._name;
    }

    public get description(): string
    {
        return this._description;
    }

    public get icon(): string
    {
        return this._icon;
    }

    public get totalThreads(): number
    {
        return this._totalThreads;
    }

    public get leaderboardScore(): number
    {
        return this._leaderboardScore;
    }

    public get totalMessages(): number
    {
        return this._totalMessages;
    }

    public get unreadMessages(): number
    {
        return this._unreadMessages;
    }

    public get lastMessageId(): number
    {
        return this._lastMessageId;
    }

    public get lastMessageAuthorId(): number
    {
        return this._lastMessageAuthorId;
    }

    public get lastMessageAuthorName(): string
    {
        return this._lastMessageAuthorName;
    }

    public get lastMessageTimeAsSecondsAgo(): number
    {
        return this._lastMessageTimeAsSecondsAgo;
    }

    public updateFrom(forum: ForumData): void
    {
        this._totalThreads = forum._totalThreads;
        this._totalMessages = forum._totalMessages;
        this._unreadMessages = forum._unreadMessages;
        this._lastMessageAuthorId = forum._lastMessageAuthorId;
        this._lastMessageAuthorName = forum._lastMessageAuthorName;
        this._lastMessageId = forum._lastMessageId;
        this._lastMessageTimeAsSecondsAgo = forum._lastMessageTimeAsSecondsAgo;
    }

    public get lastReadMessageId(): number
    {
        return (this._totalMessages - this._unreadMessages);
    }

    public set lastReadMessageId(k: number)
    {
        this._unreadMessages = (this._totalMessages - k);

        if(this._unreadMessages < 0) this._unreadMessages = 0;
    }

    public addNewThread(thread: GuildForumThread): void
    {
        this._lastMessageAuthorId = thread.lastUserId;
        this._lastMessageAuthorName = thread.lastUserName;
        this._lastMessageId = thread.lastMessageId;
        this._lastMessageTimeAsSecondsAgo = thread.lastCommentTime;
        this._totalThreads++;
        this._totalMessages++;
        this._unreadMessages = 0;
    }
}
