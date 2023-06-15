import { IMessageDataWrapper, IMessageParser, IObjectData, LegacyDataType, ObjectDataFactory } from '@/api'
import { MarketplaceOffer } from '@/nitro'

export class MarketplaceOwnOffersParser implements IMessageParser {
  private static MAX_LIST_LENGTH = 500
  private _offers: MarketplaceOffer[]

  public get offers(): MarketplaceOffer[] {
    return this._offers
  }

  private _creditsWaiting: number

  public get creditsWaiting(): number {
    return this._creditsWaiting
  }

  public flush(): boolean {
    this._offers = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._offers = []
    this._creditsWaiting = wrapper.readInt() // SoldPriceTotal

    const offerCount = wrapper.readInt()
    for (let i = 0; i < offerCount; i++) {
      const offerId = wrapper.readInt()
      const status = wrapper.readInt()
      let furniType = wrapper.readInt()

      let furniId
      let extraData
      let stuffData: IObjectData
      if (furniType == 1) {
        furniId = wrapper.readInt()
        stuffData = this.getStuffData(wrapper)
      } else {
        if (furniType == 2) {
          furniId = wrapper.readInt()
          extraData = wrapper.readString()
        } else if (furniType == 3) {
          furniId = wrapper.readInt()
          stuffData = ObjectDataFactory.getData(LegacyDataType.FORMAT_KEY)
          stuffData.uniqueNumber = wrapper.readInt()
          stuffData.uniqueSeries = wrapper.readInt()
          furniType = 1
        }
      }

      const price = wrapper.readInt()
      const local9 = wrapper.readInt()
      const local10 = wrapper.readInt()
      const local13 = new MarketplaceOffer(offerId, furniId, furniType, extraData, stuffData, price, status, local9, local10)

      if (i < MarketplaceOwnOffersParser.MAX_LIST_LENGTH) {
        this._offers.push(local13)
      }
    }

    return true
  }

  private getStuffData(wrapper: IMessageDataWrapper): IObjectData {
    const local2 = wrapper.readInt()
    const local3 = ObjectDataFactory.getData(local2)
    local3.parseWrapper(wrapper)
    return local3
  }
}
