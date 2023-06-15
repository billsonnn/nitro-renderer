import { IMessageDataWrapper } from '@/api'

export class TargetedOfferData {
  constructor(wrapper: IMessageDataWrapper) {
    this._trackingState = wrapper.readInt()
    this._id = wrapper.readInt()
    this._identifier = wrapper.readString()
    this._productCode = wrapper.readString()
    this._priceInCredits = wrapper.readInt()
    this._priceInActivityPoints = wrapper.readInt()
    this._activityPointType = wrapper.readInt()
    this._purchaseLimit = wrapper.readInt()

    const time = wrapper.readInt()
    this._expirationTime = ((time > 0) ? ((time * 1000) + Date.now()) : 0)

    this._title = wrapper.readString()
    this._description = wrapper.readString()
    this._imageUrl = wrapper.readString()
    this._iconImageUrl = wrapper.readString()
    this._type = wrapper.readInt()
    this._subProductCodes = []

    let count = wrapper.readInt()

    while (count > 0) {
      this._subProductCodes.push(wrapper.readString())

      count--
    }
    return this
  }

  protected _id: number

  public get id(): number {
    return this._id
  }

  protected _identifier: string

  public get identifier(): string {
    return this._identifier
  }

  protected _type: number

  public get type(): number {
    return this._type
  }

  protected _title: string

  public get title(): string {
    return this._title
  }

  protected _description: string

  public get description(): string {
    return this._description
  }

  protected _imageUrl: string

  public get imageUrl(): string {
    return this._imageUrl
  }

  protected _iconImageUrl: string

  public get iconImageUrl(): string {
    return this._iconImageUrl
  }

  protected _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  protected _purchaseLimit: number

  public get purchaseLimit(): number {
    return this._purchaseLimit
  }

  protected _expirationTime: number

  public get expirationTime(): number {
    return this._expirationTime
  }

  protected _priceInCredits: number

  public get priceInCredits(): number {
    return this._priceInCredits
  }

  protected _priceInActivityPoints: number

  public get priceInActivityPoints(): number {
    return this._priceInActivityPoints
  }

  protected _activityPointType: number

  public get activityPointType(): number {
    return this._activityPointType
  }

  protected _subProductCodes: string[]

  public get subProductCodes(): string[] {
    return this._subProductCodes
  }

  protected _trackingState: number

  public get trackingState(): number {
    return this._trackingState
  }

  public populate(offerData: TargetedOfferData) {
    if (!offerData) return

    this._id = offerData.id
    this._identifier = offerData.identifier
    this._type = offerData.type
    this._title = offerData.title
    this._description = offerData.description
    this._imageUrl = offerData.imageUrl
    this._iconImageUrl = offerData.iconImageUrl
    this._productCode = offerData.productCode
    this._purchaseLimit = offerData.purchaseLimit
    this._expirationTime = offerData.expirationTime
    this._priceInCredits = offerData.priceInCredits
    this._priceInActivityPoints = offerData.priceInActivityPoints
    this._activityPointType = offerData.activityPointType
    this._subProductCodes = offerData.subProductCodes
    this._trackingState = offerData.trackingState
  }

  public purchase(k: number): void {
    this._purchaseLimit = (this._purchaseLimit - k)
  }
}
