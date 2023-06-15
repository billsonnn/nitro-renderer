import { IMessageDataWrapper } from '@/api'

export class GuildForumThread {
  private _threadId: number

  public get threadId(): number {
    return this._threadId
  }

  public set threadId(id: number) {
    this._threadId = id
  }

  private _authorId: number

  public get authorId(): number {
    return this._authorId
  }

  public set authorId(id: number) {
    this._authorId = id
  }

  private _authorName: string

  public get authorName(): string {
    return this._authorName
  }

  public set authorName(name: string) {
    this._authorName = name
  }

  private _creationTimeAsSecondsAgo: number

  public get creationTimeAsSecondsAgo(): number {
    return this._creationTimeAsSecondsAgo
  }

  public set creationTimeAsSecondsAgo(time: number) {
    this._creationTimeAsSecondsAgo = time
  }

  private _header: string

  public get header(): string {
    return this._header
  }

  public set header(header: string) {
    this._header = header
  }

  private _totalMessages: number

  public get totalMessages(): number {
    return this._totalMessages
  }

  public set totalMessages(total: number) {
    this._totalMessages = total
  }

  private _unreadMessagesCount: number

  public get unreadMessagesCount(): number {
    return this._unreadMessagesCount
  }

  public set unreadMessagesCount(count: number) {
    this._unreadMessagesCount = count
  }

  private _lastMessageId: number

  public get lastMessageId(): number {
    return this._lastMessageId
  }

  public set lastMessageId(id: number) {
    this._lastMessageId = id
  }

  private _lastUserId: number

  public get lastUserId(): number {
    return this._lastUserId
  }

  public set lastUserId(id: number) {
    this._lastUserId = id
  }

  private _lastUserName: string

  public get lastUserName(): string {
    return this._lastUserName
  }

  public set lastUserName(name: string) {
    this._lastUserName = name
  }

  private _lastCommentTime: number

  public get lastCommentTime(): number {
    return this._lastCommentTime
  }

  public set lastCommentTime(time: number) {
    this._lastCommentTime = time
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  public set state(state: number) {
    this._state = state
  }

  private _adminId: number

  public get adminId(): number {
    return this._adminId
  }

  public set adminId(id: number) {
    this._adminId = id
  }

  private _adminName: string

  public get adminName(): string {
    return this._adminName
  }

  public set adminName(name: string) {
    this._adminName = name
  }

  private _adminOperationTimeAsSecondsAgo: number

  public get adminOperationTimeAsSecondsAgo(): number {
    return this._adminOperationTimeAsSecondsAgo
  }

  public set adminOperationTimeAsSecondsAgo(k: number) {
    this._adminOperationTimeAsSecondsAgo = k
  }

  private _isPinned: boolean

  public get isPinned(): boolean {
    return this._isPinned
  }

  public set isPinned(k: boolean) {
    this._isPinned = k
  }

  private _isLocked: boolean

  public get isLocked(): boolean {
    return this._isLocked
  }

  public set isLocked(flag: boolean) {
    this._isLocked = flag
  }

  public static parse(wrapper: IMessageDataWrapper): GuildForumThread {
    const thread = new GuildForumThread()

    thread._threadId = wrapper.readInt()
    thread._authorId = wrapper.readInt()
    thread._authorName = wrapper.readString()
    thread._header = wrapper.readString()
    thread._isPinned = wrapper.readBoolean()
    thread._isLocked = wrapper.readBoolean()
    thread._creationTimeAsSecondsAgo = wrapper.readInt()
    thread._totalMessages = wrapper.readInt()
    thread._unreadMessagesCount = wrapper.readInt()
    thread._lastMessageId = wrapper.readInt()
    thread._lastUserId = wrapper.readInt()
    thread._lastUserName = wrapper.readString()
    thread._lastCommentTime = wrapper.readInt()
    thread._state = wrapper.readByte()
    thread._adminId = wrapper.readInt()
    thread._adminName = wrapper.readString()
    thread._adminOperationTimeAsSecondsAgo = wrapper.readInt()

    return thread
  }
}
