import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomEntryInfoMessageParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _isOwner: boolean

  public get isOwner(): boolean {
    return this._isOwner
  }

  public flush(): boolean {
    this._roomId = 0
    this._isOwner = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._isOwner = wrapper.readBoolean()

    return true
  }
}
