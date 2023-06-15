import { IMessageDataWrapper } from '@/api'
import { CatalogPageMessageProductData } from '@/nitro'

export class PurchaseOKMessageOfferData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _localizationId: string

  public get localizationId(): string {
    return this._localizationId
  }

  private _rent: boolean

  public get rent(): boolean {
    return this._rent
  }

  private _priceCredits: number

  public get priceCredits(): number {
    return this._priceCredits
  }

  private _priceActivityPoints: number

  public get priceActivityPoints(): number {
    return this._priceActivityPoints
  }

  private _priceActivityPointsType: number

  public get priceActivityPointsType(): number {
    return this._priceActivityPointsType
  }

  private _clubLevel: number

  public get clubLevel(): number {
    return this._clubLevel
  }

  private _giftable: boolean

  public get giftable(): boolean {
    return this._giftable
  }

  private _bundlePurchaseAllowed: boolean

  public get bundlePurchaseAllowed(): boolean {
    return this._bundlePurchaseAllowed
  }

  private _products: CatalogPageMessageProductData[]

  public get products(): CatalogPageMessageProductData[] {
    return this._products
  }

  public flush(): boolean {
    this._offerId = -1
    this._localizationId = null
    this._rent = false
    this._priceCredits = 0
    this._priceActivityPoints = 0
    this._priceActivityPointsType = 0
    this._clubLevel = 0
    this._giftable = false
    this._bundlePurchaseAllowed = false
    this._products = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offerId = wrapper.readInt()
    this._localizationId = wrapper.readString()
    this._rent = wrapper.readBoolean()
    this._priceCredits = wrapper.readInt()
    this._priceActivityPoints = wrapper.readInt()
    this._priceActivityPointsType = wrapper.readInt()
    this._giftable = wrapper.readBoolean()

    let totalProducts = wrapper.readInt()

    while (totalProducts > 0) {
      this._products.push(new CatalogPageMessageProductData(wrapper))

      totalProducts--
    }

    this._clubLevel = wrapper.readInt()
    this._bundlePurchaseAllowed = wrapper.readBoolean()

    return true
  }
}
