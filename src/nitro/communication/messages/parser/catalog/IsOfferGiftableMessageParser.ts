import { IMessageDataWrapper, IMessageParser } from '@/api'

export class IsOfferGiftableMessageParser implements IMessageParser {
  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _isGiftable: boolean

  public get isGiftable(): boolean {
    return this._isGiftable
  }

  public flush(): boolean {
    this._offerId = 0
    this._isGiftable = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offerId = wrapper.readInt()
    this._isGiftable = wrapper.readBoolean()

    return true
  }
}
