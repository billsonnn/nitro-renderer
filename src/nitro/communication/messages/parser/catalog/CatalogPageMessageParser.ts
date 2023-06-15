import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogLocalizationData } from '@/nitro'
import { CatalogPageMessageOfferData } from '@/nitro'
import { FrontPageItem } from '@/nitro'

export class CatalogPageMessageParser implements IMessageParser {
  private _pageId: number

  public get pageId(): number {
    return this._pageId
  }

  private _catalogType: string

  public get catalogType(): string {
    return this._catalogType
  }

  private _layoutCode: string

  public get layoutCode(): string {
    return this._layoutCode
  }

  private _localization: CatalogLocalizationData

  public get localization(): CatalogLocalizationData {
    return this._localization
  }

  private _offers: CatalogPageMessageOfferData[]

  public get offers(): CatalogPageMessageOfferData[] {
    return this._offers
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _acceptSeasonCurrencyAsCredits: boolean

  public get acceptSeasonCurrencyAsCredits(): boolean {
    return this._acceptSeasonCurrencyAsCredits
  }

  private _frontPageItems: FrontPageItem[]

  public get frontPageItems(): FrontPageItem[] {
    return this._frontPageItems
  }

  public flush(): boolean {
    this._pageId = -1
    this._catalogType = null
    this._layoutCode = null
    this._localization = null
    this._offers = []
    this._offerId = -1
    this._acceptSeasonCurrencyAsCredits = false
    this._frontPageItems = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._pageId = wrapper.readInt()
    this._catalogType = wrapper.readString()
    this._layoutCode = wrapper.readString()
    this._localization = new CatalogLocalizationData(wrapper)

    let totalOffers = wrapper.readInt()

    while (totalOffers > 0) {
      this._offers.push(new CatalogPageMessageOfferData(wrapper))

      totalOffers--
    }

    this._offerId = wrapper.readInt()
    this._acceptSeasonCurrencyAsCredits = wrapper.readBoolean()

    if (wrapper.bytesAvailable) {
      let totalFrontPageItems = wrapper.readInt()

      while (totalFrontPageItems > 0) {
        this._frontPageItems.push(new FrontPageItem(wrapper))

        totalFrontPageItems--
      }
    }

    return true
  }
}
