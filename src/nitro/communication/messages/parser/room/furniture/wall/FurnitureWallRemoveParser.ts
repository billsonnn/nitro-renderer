import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FurnitureWallRemoveParser implements IMessageParser {
  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  public flush(): boolean {
    this._itemId = 0
    this._userId = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = parseInt(wrapper.readString())
    this._userId = wrapper.readInt()

    return true
  }
}
