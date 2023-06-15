import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureFloorDataParser } from '@/nitro'

export class FurnitureFloorParser implements IMessageParser {
  private _owners: Map<number, string>

  public get owners(): Map<number, string> {
    return this._owners
  }

  private _items: FurnitureFloorDataParser[]

  public get items(): FurnitureFloorDataParser[] {
    return this._items
  }

  public flush(): boolean {
    this._owners = new Map()
    this._items = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    if (!this.parseOwners(wrapper)) return false

    let totalItems = wrapper.readInt()

    while (totalItems > 0) {
      const item = new FurnitureFloorDataParser(wrapper)

      if (!item) continue

      const username = this._owners.get(item.userId)

      if (username) item.username = username

      this._items.push(item)

      totalItems--
    }

    return true
  }

  private parseOwners(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalOwners = wrapper.readInt()

    while (totalOwners > 0) {
      this._owners.set(wrapper.readInt(), wrapper.readString())

      totalOwners--
    }

    return true
  }
}
