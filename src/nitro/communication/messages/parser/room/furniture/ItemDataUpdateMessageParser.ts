import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ItemDataUpdateMessageParser implements IMessageParser {
  private _itemId: number
  private _data: string

  public get data(): string {
    return this._data
  }

  public get furnitureId(): number {
    return this._itemId
  }

  public flush(): boolean {
    this._itemId = 0
    this._data = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = parseInt(wrapper.readString())
    this._data = wrapper.readString()

    return true
  }
}
