import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomMessageNotificationMessageParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  private _messageCount: number

  public get messageCount(): number {
    return this._messageCount
  }

  public flush(): boolean {
    this._roomId = -1
    this._roomName = null
    this._messageCount = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._roomName = wrapper.readString()
    this._messageCount = wrapper.readInt()

    return true
  }
}
