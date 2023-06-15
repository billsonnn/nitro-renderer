import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceCancelOfferResultParser implements IMessageParser {
  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _success: boolean

  public get success(): boolean {
    return this._success
  }

  public flush(): boolean {
    this._offerId = 0
    this._success = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offerId = wrapper.readInt()
    this._success = wrapper.readBoolean()

    return true
  }
}
