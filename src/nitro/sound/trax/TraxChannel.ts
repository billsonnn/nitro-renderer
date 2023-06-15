import { TraxChannelItem } from '@/nitro'

export class TraxChannel {
  private _id: number

  constructor(id: number) {
    this._id = id
    this._items = []
  }

  private _items: TraxChannelItem[]

  public get items(): TraxChannelItem[] {
    return this._items
  }

  public addChannelItem(item: TraxChannelItem): void {
    this._items.push(item)
  }
}
