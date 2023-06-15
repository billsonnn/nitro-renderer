import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitChatParser implements IMessageParser {
  private _roomIndex: number

  public get roomIndex(): number {
    return this._roomIndex
  }

  private _message: string

  public get message(): string {
    return this._message
  }

  private _gesture: number

  public get gesture(): number {
    return this._gesture
  }

  private _bubble: number

  public get bubble(): number {
    return this._bubble
  }

  private _urls: string[]

  public get urls(): string[] {
    return this._urls
  }

  private _messageLength: number

  public get messageLength(): number {
    return this._messageLength
  }

  public flush(): boolean {
    this._roomIndex = null
    this._message = null
    this._gesture = 0
    this._bubble = 0
    this._urls = []
    this._messageLength = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomIndex = wrapper.readInt()
    this._message = wrapper.readString()
    this._gesture = wrapper.readInt()
    this._bubble = wrapper.readInt()

    this.parseUrls(wrapper)

    this._messageLength = wrapper.readInt()

    return true
  }

  private parseUrls(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._urls = []

    let totalUrls = wrapper.readInt()

    while (totalUrls > 0) {
      this._urls.push(wrapper.readString())

      totalUrls--
    }

    return true
  }
}
