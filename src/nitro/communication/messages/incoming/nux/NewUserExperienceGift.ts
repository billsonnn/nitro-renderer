import { IMessageDataWrapper } from '@/api'
import { ProductOffer } from '@/nitro'

export class NewUserExperienceGift {
  constructor(wrapper: IMessageDataWrapper) {
    this._thumbnailUrl = wrapper.readString()
    if (this._thumbnailUrl == '') {
      this._thumbnailUrl = null
    }

    this._productOfferList = []
    const count: number = wrapper.readInt()
    let index = 0

    while (index < count) {
      this._productOfferList.push(new ProductOffer(wrapper))
      index++
    }
  }

  private _thumbnailUrl: string

  public get thumbnailUrl(): string {
    return this._thumbnailUrl
  }

  private _productOfferList: ProductOffer[]

  public get productOfferList(): ProductOffer[] {
    return this._productOfferList
  }
}
