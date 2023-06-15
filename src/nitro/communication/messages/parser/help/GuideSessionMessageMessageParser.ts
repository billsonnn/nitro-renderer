import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GuideSessionMessageMessageParser implements IMessageParser {
  private _chatMessage: string

  public get chatMessage(): string {
    return this._chatMessage
  }

  private _senderId: number

  public get senderId(): number {
    return this._senderId
  }

  public flush(): boolean {
    this._chatMessage = null
    this._senderId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._chatMessage = wrapper.readString()
    this._senderId = wrapper.readInt()

    return true
  }
}
