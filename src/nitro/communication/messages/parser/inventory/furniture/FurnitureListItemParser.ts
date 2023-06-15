import { IMessageDataWrapper, IObjectData } from '@/api'
import { GetTickerTime } from '@/pixi-proxy'
import { FurnitureDataParser } from '@/nitro'
import { IFurnitureItemData } from '@/nitro'

export class FurnitureListItemParser implements IFurnitureItemData {
  private static WALL_ITEM: string = 'I'
  private static FLOOR_ITEM: string = 'S'
  private _isRecyclable: boolean

  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _rentable: boolean

  public get rentable(): boolean {
    return this._rentable
  }

  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _furniType: string

  public get furniType(): string {
    return this._furniType
  }

  private _ref: number

  public get ref(): number {
    return this._ref
  }

  private _spriteId: number

  public get spriteId(): number {
    return this._spriteId
  }

  private _category: number

  public get category(): number {
    return this._category
  }

  private _stuffData: IObjectData

  public get stuffData(): IObjectData {
    return this._stuffData
  }

  private _isGroupable: boolean

  public get isGroupable(): boolean {
    return this._isGroupable
  }

  private _tradable: boolean

  public get tradable(): boolean {
    return this._tradable
  }

  private _sellable: boolean

  public get sellable(): boolean {
    return this._sellable
  }

  private _secondsToExpiration: number

  public get secondsToExpiration(): number {
    return this._secondsToExpiration
  }

  private _extra: number

  public get extra(): number {
    return this._extra
  }

  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _isWallItem: boolean

  public get isWallItem(): boolean {
    return this._isWallItem
  }

  private _hasRentPeriodStarted: boolean

  public get hasRentPeriodStarted(): boolean {
    return this._hasRentPeriodStarted
  }

  private _expirationTimeStamp: number

  public get expirationTimeStamp(): number {
    return this._expirationTimeStamp
  }

  private _slotId: string

  public get slotId(): string {
    return this._slotId
  }

  private _songId: number

  public get songId(): number {
    return this._songId
  }

  public get isRecycleable(): boolean {
    return this._isRecyclable
  }

  public get creationDay(): number {
    return 0
  }

  public get creationMonth(): number {
    return 0
  }

  public get creationYear(): number {
    return 0
  }

  public get isExternalImageFurni(): boolean {
    return !(this._furniType.indexOf('external_image') === -1)
  }

  public flush(): boolean {
    this._rentable = false
    this._itemId = 0
    this._furniType = null
    this._ref = 0
    this._spriteId = 0
    this._category = 0
    this._stuffData = null
    this._isGroupable = false
    this._isRecyclable = false
    this._tradable = false
    this._sellable = false
    this._secondsToExpiration = 0
    this._extra = 0
    this._flatId = 0
    this._isWallItem = false
    this._hasRentPeriodStarted = false
    this._expirationTimeStamp = 0
    this._slotId = ''
    this._songId = -1

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = wrapper.readInt()
    this._furniType = wrapper.readString()
    this._ref = wrapper.readInt()
    this._spriteId = wrapper.readInt()
    this._category = wrapper.readInt()
    this._stuffData = FurnitureDataParser.parseObjectData(wrapper)
    this._isRecyclable = wrapper.readBoolean()
    this._tradable = wrapper.readBoolean()
    this._isGroupable = wrapper.readBoolean()
    this._sellable = wrapper.readBoolean()
    this._secondsToExpiration = wrapper.readInt()
    this._expirationTimeStamp = GetTickerTime()

    if (this.secondsToExpiration > -1) {
      this._rentable = true
    } else {
      this._rentable = false
      this._secondsToExpiration = -1
    }

    this._hasRentPeriodStarted = wrapper.readBoolean()
    this._flatId = wrapper.readInt()
    this._isWallItem = (this._furniType === FurnitureListItemParser.WALL_ITEM)

    if (this._furniType === FurnitureListItemParser.FLOOR_ITEM) {
      this._slotId = wrapper.readString()
      this._extra = wrapper.readInt()
    }

    return true
  }
}
