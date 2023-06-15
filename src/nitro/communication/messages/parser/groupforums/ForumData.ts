import { IMessageDataWrapper } from '@/api'
import { GuildForumThread } from '@/nitro'

export class ForumData {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _description: string

  public get description(): string {
    return this._description
  }

  private _icon: string

  public get icon(): string {
    return this._icon
  }

  private _totalThreads: number

  public get totalThreads(): number {
    return this._totalThreads
  }

  private _leaderboardScore: number

  public get leaderboardScore(): number {
    return this._leaderboardScore
  }

  private _totalMessages: number

  public get totalMessages(): number {
    return this._totalMessages
  }

  private _unreadMessages: number

  public get unreadMessages(): number {
    return this._unreadMessages
  }

  private _lastMessageId: number

  public get lastMessageId(): number {
    return this._lastMessageId
  }

  private _lastMessageAuthorId: number

  public get lastMessageAuthorId(): number {
    return this._lastMessageAuthorId
  }

  private _lastMessageAuthorName: string

  public get lastMessageAuthorName(): string {
    return this._lastMessageAuthorName
  }

  private _lastMessageTimeAsSecondsAgo: number

  public get lastMessageTimeAsSecondsAgo(): number {
    return this._lastMessageTimeAsSecondsAgo
  }

  public get lastReadMessageId(): number {
    return (this._totalMessages - this._unreadMessages)
  }

  public set lastReadMessageId(k: number) {
    this._unreadMessages = (this._totalMessages - k)

    if (this._unreadMessages < 0) this._unreadMessages = 0
  }

  public static parse(wrapper: IMessageDataWrapper): ForumData {
    return this.fillFromMessage(new ForumData(), wrapper)
  }

  protected static fillFromMessage(data: ForumData, wrapper: IMessageDataWrapper): ForumData {
    data._groupId = wrapper.readInt()
    data._name = wrapper.readString()
    data._description = wrapper.readString()
    data._icon = wrapper.readString()
    data._totalThreads = wrapper.readInt()
    data._leaderboardScore = wrapper.readInt()
    data._totalMessages = wrapper.readInt()
    data._unreadMessages = wrapper.readInt()
    data._lastMessageId = wrapper.readInt()
    data._lastMessageAuthorId = wrapper.readInt()
    data._lastMessageAuthorName = wrapper.readString()
    data._lastMessageTimeAsSecondsAgo = wrapper.readInt()

    return data
  }

  public updateFrom(forum: ForumData): void {
    this._totalThreads = forum._totalThreads
    this._totalMessages = forum._totalMessages
    this._unreadMessages = forum._unreadMessages
    this._lastMessageAuthorId = forum._lastMessageAuthorId
    this._lastMessageAuthorName = forum._lastMessageAuthorName
    this._lastMessageId = forum._lastMessageId
    this._lastMessageTimeAsSecondsAgo = forum._lastMessageTimeAsSecondsAgo
  }

  public addNewThread(thread: GuildForumThread): void {
    this._lastMessageAuthorId = thread.lastUserId
    this._lastMessageAuthorName = thread.lastUserName
    this._lastMessageId = thread.lastMessageId
    this._lastMessageTimeAsSecondsAgo = thread.lastCommentTime
    this._totalThreads++
    this._totalMessages++
    this._unreadMessages = 0
  }
}
