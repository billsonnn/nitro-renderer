import { IMessageDataWrapper, IMessageParser } from '@/api'

export class LimitedOfferAppearingNextMessageParser implements IMessageParser {
  private _appearsInSeconds: number

  public get appearsInSeconds(): number {
    return this._appearsInSeconds
  }

  private _pageId: number

  public get pageId(): number {
    return this._pageId
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _productType: string

  public get productType(): string {
    return this._productType
  }

  public flush(): boolean {
    this._appearsInSeconds = -1
    this._pageId = -1
    this._offerId = -1
    this._productType = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._appearsInSeconds = wrapper.readInt()
    this._pageId = wrapper.readInt()
    this._offerId = wrapper.readInt()
    this._productType = wrapper.readString()

    return true
  }
}
