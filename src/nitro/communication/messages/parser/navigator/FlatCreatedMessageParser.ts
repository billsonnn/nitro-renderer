import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FlatCreatedMessageParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  public flush(): boolean {
    this._roomId = -1
    this._roomName = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._roomName = wrapper.readString()

    return true
  }
}
