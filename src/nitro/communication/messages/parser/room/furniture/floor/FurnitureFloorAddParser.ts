import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureFloorDataParser } from '@/nitro'

export class FurnitureFloorAddParser implements IMessageParser {
  private _item: FurnitureFloorDataParser

  public get item(): FurnitureFloorDataParser {
    return this._item
  }

  public flush(): boolean {
    this._item = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._item = new FurnitureFloorDataParser(wrapper)
    this._item.username = wrapper.readString()

    return true
  }
}
