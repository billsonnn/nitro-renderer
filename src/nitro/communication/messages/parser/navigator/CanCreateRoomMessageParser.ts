import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CanCreateRoomMessageParser implements IMessageParser {
  public static readonly CREATION_ALLOWED = 0
  public static readonly ROOM_LIMIT_REACHED = 1

  private _resultCode: number

  public get resultCode(): number {
    return this._resultCode
  }

  private _roomLimit: number

  public get roomLimit(): number {
    return this._roomLimit
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._resultCode = wrapper.readInt()
    this._roomLimit = wrapper.readInt()

    return true
  }
}
