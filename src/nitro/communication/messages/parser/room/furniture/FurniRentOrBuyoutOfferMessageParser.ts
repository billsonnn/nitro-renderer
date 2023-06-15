import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FurniRentOrBuyoutOfferMessageParser implements IMessageParser {
  private _isWallItem: boolean

  public get isWallItem(): boolean {
    return this._isWallItem
  }

  private _furniTypeName: string

  public get furniTypeName(): string {
    return this._furniTypeName
  }

  private _buyout: boolean

  public get buyout(): boolean {
    return this._buyout
  }

  private _priceInCredits: number

  public get priceInCredits(): number {
    return this._priceInCredits
  }

  private _priceInActivityPoints: number

  public get priceInActivityPoints(): number {
    return this._priceInActivityPoints
  }

  private _activityPointType: number

  public get activityPointType(): number {
    return this._activityPointType
  }

  public flush(): boolean {
    this._isWallItem = false
    this._furniTypeName = null
    this._buyout = false
    this._priceInCredits = -1
    this._priceInActivityPoints = -1
    this._activityPointType = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._isWallItem = wrapper.readBoolean()
    this._furniTypeName = wrapper.readString()
    this._buyout = wrapper.readBoolean()
    this._priceInCredits = wrapper.readInt()
    this._priceInActivityPoints = wrapper.readInt()
    this._activityPointType = wrapper.readInt()

    return true
  }
}
