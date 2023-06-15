import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogPageMessageOfferData } from '@/nitro'
import { ClubGiftData } from '@/nitro'

export class ClubGiftInfoParser implements IMessageParser {
  private _daysUntilNextGift: number

  public get daysUntilNextGift(): number {
    return this._daysUntilNextGift
  }

  private _giftsAvailable: number

  public get giftsAvailable(): number {
    return this._giftsAvailable
  }

  public set giftsAvailable(gifts: number) {
    this._giftsAvailable = gifts
  }

  private _offers: CatalogPageMessageOfferData[]

  public get offers(): CatalogPageMessageOfferData[] {
    return this._offers
  }

  private _giftData: Map<number, ClubGiftData>

  public get giftData(): Map<number, ClubGiftData> {
    return this._giftData
  }

  public flush(): boolean {

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offers = []
    this._giftData = new Map<number, ClubGiftData>()
    this._daysUntilNextGift = wrapper.readInt()
    this._giftsAvailable = wrapper.readInt()

    const offerCount = wrapper.readInt()

    for (let i = 0; i < offerCount; i++) {
      this._offers.push(new CatalogPageMessageOfferData(wrapper))
    }

    const giftDataCount = wrapper.readInt()

    for (let i = 0; i < giftDataCount; i++) {
      const item = new ClubGiftData(wrapper)
      this._giftData.set(item.offerId, item)
    }

    return true
  }

  public getOfferExtraData(offerId: number): ClubGiftData {
    if (!offerId) return null

    return this._giftData.get(offerId)
  }
}
