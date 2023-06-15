import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomUnitHandItemReceivedParser implements IMessageParser {
  private _giverUserId: number

  public get giverUserId(): number {
    return this._giverUserId
  }

  private _handItemType: number

  public get handItemType(): number {
    return this._handItemType
  }

  public flush(): boolean {
    this._giverUserId = -1
    this._handItemType = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._giverUserId = wrapper.readInt()
    this._handItemType = wrapper.readInt()

    return true
  }
}
