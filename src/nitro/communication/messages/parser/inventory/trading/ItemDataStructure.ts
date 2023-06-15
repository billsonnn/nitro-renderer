import { IMessageDataWrapper, IObjectData } from '@/api'
import { GetTickerTime } from '@/pixi-proxy'
import { FurnitureDataParser } from '@/nitro'
import { IFurnitureItemData } from '@/nitro'

export class ItemDataStructure implements IFurnitureItemData {
  constructor(wrapper: IMessageDataWrapper) {
    this._itemId = wrapper.readInt()
    this._furniType = wrapper.readString().toUpperCase()
    this._ref = wrapper.readInt()
    this._spriteId = wrapper.readInt()
    this._category = wrapper.readInt()
    this._isGroupable = wrapper.readBoolean()
    this._stuffData = FurnitureDataParser.parseObjectData(wrapper)
    this._secondsToExpiration = -1
    this._expirationTimeStamp = GetTickerTime()
    this._hasRentPeriodStarted = false
    this._creationDay = wrapper.readInt()
    this._creationMonth = wrapper.readInt()
    this._creationYear = wrapper.readInt()
    this._extra = ((this.furniType === 'S') ? wrapper.readInt() : -1)
    this._flatId = -1
    this._rentable = false
    this._isWallItem = (this._furniType === 'I')
  }

  private _expirationTimeStamp: number

  public get expirationTimeStamp(): number {
    return this._expirationTimeStamp
  }

  private _isWallItem: boolean

  public get isWallItem(): boolean {
    return this._isWallItem
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

  private _extra: number

  public get extra(): number {
    return this._extra
  }

  private _secondsToExpiration: number

  public get secondsToExpiration(): number {
    return this._secondsToExpiration
  }

  private _creationDay: number

  public get creationDay(): number {
    return this._creationDay
  }

  private _creationMonth: number

  public get creationMonth(): number {
    return this._creationMonth
  }

  private _creationYear: number

  public get creationYear(): number {
    return this._creationYear
  }

  private _isGroupable: boolean

  public get isGroupable(): boolean {
    return this._isGroupable
  }

  private _songId: number

  public get songId(): number {
    return this._extra
  }

  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _rentable: boolean

  public get rentable(): boolean {
    return this._rentable
  }

  private _hasRentPeriodStarted: boolean

  public get hasRentPeriodStarted(): boolean {
    return this._hasRentPeriodStarted
  }

  public get isRecycleable(): boolean {
    return true
  }

  public get tradable(): boolean {
    return true
  }

  public get sellable(): boolean {
    return true
  }

  public get slotId(): string {
    return null
  }

  public get isExternalImageFurni(): boolean {
    return (this._furniType.indexOf('external_image') !== -1)
  }
}
