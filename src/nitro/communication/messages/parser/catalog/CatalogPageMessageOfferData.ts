import { IMessageDataWrapper } from '@/api'
import { CatalogPageMessageProductData } from '@/nitro'

export class CatalogPageMessageOfferData {
  constructor(wrapper: IMessageDataWrapper) {
    this._offerId = wrapper.readInt()
    this._localizationId = wrapper.readString()
    this._rent = wrapper.readBoolean()
    this._priceCredits = wrapper.readInt()
    this._priceActivityPoints = wrapper.readInt()
    this._priceActivityPointsType = wrapper.readInt()
    this._giftable = wrapper.readBoolean()

    this._products = []

    let totalProducts = wrapper.readInt()

    while (totalProducts > 0) {
      this._products.push(new CatalogPageMessageProductData(wrapper))

      totalProducts--
    }

    this._clubLevel = wrapper.readInt()
    this._bundlePurchaseAllowed = wrapper.readBoolean()
    this._isPet = wrapper.readBoolean()
    this._previewImage = wrapper.readString()
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

  private _isPet: boolean

  public get isPet(): boolean {
    return this._isPet
  }

  private _previewImage: string

  public get previewImage(): string {
    return this._previewImage
  }

  private _products: CatalogPageMessageProductData[]

  public get products(): CatalogPageMessageProductData[] {
    return this._products
  }
}
