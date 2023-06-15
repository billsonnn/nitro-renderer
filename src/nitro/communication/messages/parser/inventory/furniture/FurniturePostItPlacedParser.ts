import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FurniturePostItPlacedParser implements IMessageParser {
  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _itemsLeft: number

  public get itemsLeft(): number {
    return this._itemsLeft
  }

  public flush(): boolean {
    this._itemId = 0
    this._itemsLeft = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = wrapper.readInt()
    this._itemsLeft = wrapper.readInt()

    return true
  }
}
