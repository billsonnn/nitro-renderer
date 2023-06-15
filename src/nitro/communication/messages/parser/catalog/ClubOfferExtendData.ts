import { IMessageDataWrapper } from '@/api'
import { ClubOfferData } from '@/nitro'

export class ClubOfferExtendData extends ClubOfferData {
  constructor(wrapper: IMessageDataWrapper) {
    super(wrapper)

    this._originalPrice = wrapper.readInt()
    this._originalActivityPointPrice = wrapper.readInt()
    this._originalActivityPointType = wrapper.readInt()
    this._subscriptionDaysLeft = wrapper.readInt()
  }

  private _originalPrice: number

  public get originalPrice(): number {
    return this._originalPrice * this.months
  }

  private _originalActivityPointPrice: number

  public get originalActivityPointPrice(): number {
    return this._originalActivityPointPrice * this.months
  }

  private _originalActivityPointType: number

  public get originalActivityPointType(): number {
    return this._originalActivityPointType
  }

  private _subscriptionDaysLeft: number

  public get subscriptionDaysLeft(): number {
    return this._subscriptionDaysLeft
  }

  public get discountCreditAmount(): number {
    return (this._originalPrice * this.months) - this.priceCredits
  }

  public get discountActivityPointAmount(): number {
    return (this.originalActivityPointPrice * this.months) - this.priceActivityPoints
  }
}
