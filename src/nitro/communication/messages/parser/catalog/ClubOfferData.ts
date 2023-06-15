import { IMessageDataWrapper } from '@/api'

export class ClubOfferData {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this._offerId = wrapper.readInt()
    this._productCode = wrapper.readString()

    wrapper.readBoolean()

    this._priceCredits = wrapper.readInt()
    this._priceActivityPoints = wrapper.readInt()
    this._priceActivityPointsType = wrapper.readInt()
    this._vip = wrapper.readBoolean()
    this._months = wrapper.readInt()
    this._extraDays = wrapper.readInt()
    this._giftable = wrapper.readBoolean()
    this._daysLeftAfterPurchase = wrapper.readInt()
    this._year = wrapper.readInt()
    this._month = wrapper.readInt()
    this._day = wrapper.readInt()
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  private _productCode: string

  public get productCode(): string {
    return this._productCode
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

  private _vip: boolean

  public get vip(): boolean {
    return this._vip
  }

  private _months: number

  public get months(): number {
    return this._months
  }

  private _extraDays: number

  public get extraDays(): number {
    return this._extraDays
  }

  private _daysLeftAfterPurchase: number

  public get daysLeftAfterPurchase(): number {
    return this._daysLeftAfterPurchase
  }

  private _year: number

  public get year(): number {
    return this._year
  }

  private _month: number

  public get month(): number {
    return this._month
  }

  private _day: number

  public get day(): number {
    return this._day
  }

  private _giftable: boolean

  public get giftable(): boolean {
    return this._giftable
  }
}
