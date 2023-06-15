import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureWallDataParser } from '@/nitro'

export class FurnitureWallAddParser implements IMessageParser {
  private _item: FurnitureWallDataParser

  public get item(): FurnitureWallDataParser {
    return this._item
  }

  public flush(): boolean {
    this._item = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._item = new FurnitureWallDataParser(wrapper)
    this._item.username = wrapper.readString()

    return true
  }
}
