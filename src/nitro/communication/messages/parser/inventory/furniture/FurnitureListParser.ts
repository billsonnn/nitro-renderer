import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FurnitureListItemParser } from '@/nitro'

export class FurnitureListParser implements IMessageParser {
  private _totalFragments: number

  public get totalFragments(): number {
    return this._totalFragments
  }

  private _fragmentNumber: number

  public get fragmentNumber(): number {
    return this._fragmentNumber
  }

  private _fragment: Map<number, FurnitureListItemParser>

  public get fragment(): Map<number, FurnitureListItemParser> {
    return this._fragment
  }

  public flush(): boolean {
    this._totalFragments = 0
    this._fragmentNumber = 0
    this._fragment = new Map()

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._totalFragments = wrapper.readInt()
    this._fragmentNumber = wrapper.readInt()

    let totalItems = wrapper.readInt()

    while (totalItems > 0) {
      const item = new FurnitureListItemParser(wrapper)

      if (item) this._fragment.set(item.itemId, item)

      totalItems--
    }

    return true
  }
}
