import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceBuyOfferResultParser implements IMessageParser {
  private _newOfferId: number

  private _result: number

  public get result(): number {
    return this._result
  }

  private _newPrice: number

  public get newPrice(): number {
    return this._newPrice
  }

  private _requestedOfferId: number

  public get requestedOfferId(): number {
    return this._requestedOfferId
  }

  public get offerId(): number {
    return this._newOfferId
  }

  public flush(): boolean {
    this._newOfferId = -1
    this._newPrice = 0
    this._requestedOfferId = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._result = wrapper.readInt()
    this._newOfferId = wrapper.readInt()
    this._newPrice = wrapper.readInt()
    this._requestedOfferId = wrapper.readInt()

    return true
  }
}
