import { IMessageDataWrapper, IMessageParser } from '@/api'
import { BotData } from '@/nitro'

export class BotReceivedMessageParser implements IMessageParser {
  private _boughtAsGift: boolean

  public get boughtAsGift(): boolean {
    return this._boughtAsGift
  }

  private _item: BotData

  public get item(): BotData {
    return this._item
  }

  public flush(): boolean {
    this._boughtAsGift = false
    this._item = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._boughtAsGift = wrapper.readBoolean()
    this._item = new BotData(wrapper)

    return true
  }
}
