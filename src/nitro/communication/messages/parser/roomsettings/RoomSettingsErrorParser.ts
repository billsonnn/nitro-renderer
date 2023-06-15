import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomSettingsErrorParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _code: number

  public get code(): number {
    return this._code
  }

  public flush(): boolean {
    this._roomId = 0
    this._code = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._code = wrapper.readInt()

    return true
  }
}
