import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceCanMakeOfferResultParser implements IMessageParser {
  private _result: number

  private _tokenCount: number

  public get tokenCount(): number {
    return this._tokenCount
  }

  public get resultCode(): number {
    return this._result
  }

  public flush(): boolean {
    this._tokenCount = 0
    this._result = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._result = wrapper.readInt()
    this._tokenCount = wrapper.readInt()

    return true
  }
}
