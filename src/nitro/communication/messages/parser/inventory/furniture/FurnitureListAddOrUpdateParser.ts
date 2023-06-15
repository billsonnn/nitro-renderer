import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureListItemParser } from '@/nitro'

export class FurnitureListAddOrUpdateParser implements IMessageParser {
  private _items: FurnitureListItemParser[]

  public get items(): FurnitureListItemParser[] {
    return this._items
  }

  public flush(): boolean {
    this._items = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._items.push(new FurnitureListItemParser(wrapper))

    return true
  }
}
