import { IMessageDataWrapper } from '@/api'
import { GetTickerTime } from '@/pixi-proxy'

export class FrontPageItem {
  public static ITEM_CATALOGUE_PAGE: number = 0
  public static ITEM_PRODUCT_OFFER: number = 1
  public static ITEM_IAP: number = 2

  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _position: number

  public get position(): number {
    return this._position
  }

  private _itemName: string

  public get itemName(): string {
    return this._itemName
  }

  private _itemPromoImage: string

  public get itemPromoImage(): string {
    return this._itemPromoImage
  }

  private _catalogPageLocation: string

  public get catalogPageLocation(): string {
    return this._catalogPageLocation
  }

  private _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  private _productOfferId: number

  public get productOfferId(): number {
    return this._productOfferId
  }

  private _expirationTime: number

  public get expirationTime(): number {
    return this._expirationTime
  }

  public flush(): boolean {
    this._type = -1
    this._position = null
    this._itemName = null
    this._itemPromoImage = null
    this._catalogPageLocation = null
    this._productCode = null
    this._productOfferId = 0
    this._expirationTime = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._position = wrapper.readInt()
    this._itemName = wrapper.readString()
    this._itemPromoImage = wrapper.readString()
    this._type = wrapper.readInt()

    switch (this._type) {
      case FrontPageItem.ITEM_CATALOGUE_PAGE:
        this._catalogPageLocation = wrapper.readString()
        break
      case FrontPageItem.ITEM_PRODUCT_OFFER:
        this._productOfferId = wrapper.readInt()
        break
      case FrontPageItem.ITEM_IAP:
        this._productCode = wrapper.readString()
        break
    }

    const time = wrapper.readInt()

    this._expirationTime = ((time > 0) ? ((time * 1000) + GetTickerTime()) : 0)

    return true
  }
}
