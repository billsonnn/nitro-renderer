import { IMessageDataWrapper, IMessageParser } from '@/api'
import { BotData } from '@/nitro'

export class BotAddedToInventoryParser implements IMessageParser {
  private _openInventory: boolean

  private _item: BotData

  public get item(): BotData {
    return this._item
  }

  public flush(): boolean {
    this._item = null
    this._openInventory = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._item = new BotData(wrapper)
    this._openInventory = wrapper.readBoolean()

    return true
  }

  public openInventory(): boolean {
    return this._openInventory
  }
}
