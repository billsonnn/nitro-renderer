import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FlatControllerRemovedParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  public flush(): boolean {
    this._roomId = 0
    this._userId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._userId = wrapper.readInt()

    return true
  }
}
