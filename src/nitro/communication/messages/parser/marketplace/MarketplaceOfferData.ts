import { IObjectData } from '@/api'

export class MarketplaceOfferData {
  public static TYPE_LANDSCAPE: number = 1
  public static TYPE_FLOOR: number = 2

  constructor(offerId: number, furniId: number, furniType: number, extraData: string, stuffData: IObjectData, price: number, status: number, averagePrice: number, offerCount: number = -1) {
    this._offerId = offerId
    this._furniId = furniId
    this._furniType = furniType
    this._extraData = extraData
    this._stuffData = stuffData
    this._price = price
    this._status = status
    this._averagePrice = averagePrice
    this._offerCount = offerCount
  }

  private _offerId: number

  public get offerId(): number {
    return this._offerId
  }

  public set offerId(offerId: number) {
    this._offerId = offerId
  }

  private _furniId: number

  public get furniId(): number {
    return this._furniId
  }

  private _furniType: number

  public get furniType(): number {
    return this._furniType
  }

  private _extraData: string

  public get extraData(): string {
    return this._extraData
  }

  private _stuffData: IObjectData

  public get stuffData(): IObjectData {
    return this._stuffData
  }

  private _price: number

  public get price(): number {
    return this._price
  }

  public set price(price: number) {
    this._price = price
  }

  private _averagePrice: number

  public get averagePrice(): number {
    return this._averagePrice
  }

  private _imageCallback: number

  public get imageCallback(): number {
    return this._imageCallback
  }

  public set imageCallback(callback: number) {
    this._imageCallback = callback
  }

  private _status: number

  public get status(): number {
    return this._status
  }

  private _timeLeftMinutes: number = -1

  public get timeLeftMinutes(): number {
    return this._timeLeftMinutes
  }

  public set timeLeftMinutes(minutes: number) {
    this._timeLeftMinutes = minutes
  }

  private _offerCount: number

  public get offerCount(): number {
    return this._offerCount
  }

  public set offerCount(count: number) {
    this._offerCount = count
  }

  private _image: string

  public get image(): string {
    return this._image
  }

  public set image(image: string) {
    this._image = image
  }

  public get isUniqueLimitedItem(): boolean {
    return (this.stuffData && (this.stuffData.uniqueSeries > 0))
  }
}
