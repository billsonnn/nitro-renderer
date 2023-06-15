import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomSettingsUpdatedParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  public flush(): boolean {
    this._roomId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()

    return true
  }
}
