import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceMakeOfferResultParser implements IMessageParser {
  private _result: number

  public get result(): number {
    return this._result
  }

  public flush(): boolean {
    this._result = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._result = wrapper.readInt()

    return true
  }
}
