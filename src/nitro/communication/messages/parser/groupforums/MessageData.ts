import { IMessageDataWrapper } from '@/api'

export class MessageData {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _messageId: number

  public get messageId(): number {
    return this._messageId
  }

  public set messageId(id: number) {
    this._messageId = id
  }

  private _messageIndex: number

  public get messageIndex(): number {
    return this._messageIndex
  }

  public set messageIndex(index: number) {
    this._messageIndex = index
  }

  private _authorId: number

  public get authorId(): number {
    return this._authorId
  }

  public set authorId(id: number) {
    this._authorId = id
  }

  private _threadId: number

  public get threadId(): number {
    return this._threadId
  }

  public set threadId(id: number) {
    this._threadId = id
  }

  private _creationTime: number

  public get creationTime(): number {
    return this._creationTime
  }

  public set creationTime(time: number) {
    this._creationTime = time
  }

  private _messageText: string

  public get messageText(): string {
    return this._messageText
  }

  public set messageText(text: string) {
    this._messageText = text
  }

  private _authorName: string

  public get authorName(): string {
    return this._authorName
  }

  public set authorName(name: string) {
    this._authorName = name
  }

  private _authorFigure: string

  public get authorFigure(): string {
    return this._authorFigure
  }

  public set authorFigure(figure: string) {
    this._authorFigure = figure
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

  private _adminOperationTimeAsSeccondsAgo: number

  public get adminOperationTimeAsSeccondsAgo(): number {
    return this._adminOperationTimeAsSeccondsAgo
  }

  public set adminOperationTimeAsSeccondsAgo(time: number) {
    this._adminOperationTimeAsSeccondsAgo = time
  }

  private _authorPostCount: number

  public get authorPostCount(): number {
    return this._authorPostCount
  }

  public set authorPostCount(count: number) {
    this._authorPostCount = count
  }

  public set groupID(id: number) {
    this._groupId = id
  }

  public static parse(wrapper: IMessageDataWrapper): MessageData {
    const messageData = new MessageData()

    messageData._messageId = wrapper.readInt()
    messageData._messageIndex = wrapper.readInt()
    messageData._authorId = wrapper.readInt()
    messageData._authorName = wrapper.readString()
    messageData._authorFigure = wrapper.readString()
    messageData._creationTime = wrapper.readInt()
    messageData._messageText = wrapper.readString()
    messageData._state = wrapper.readByte()
    messageData._adminId = wrapper.readInt()
    messageData._adminName = wrapper.readString()
    messageData._adminOperationTimeAsSeccondsAgo = wrapper.readInt()
    messageData._authorPostCount = wrapper.readInt()

    return messageData
  }
}
