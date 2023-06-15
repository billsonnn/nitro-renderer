import { IMessageDataWrapper, IObjectData } from '@/api'
import { FurnitureDataParser } from '@/nitro'

export class FurnitureFloorDataParser {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _spriteId: number

  public get spriteId(): number {
    return this._spriteId
  }

  private _spriteName: string

  public get spriteName(): string {
    return this._spriteName
  }

  public set spriteName(type: string) {
    this._spriteName = type
  }

  private _x: number

  public get x(): number {
    return this._x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  private _direction: number

  public get direction(): number {
    return this._direction
  }

  private _z: number

  public get z(): number {
    return ((isNaN(this._z)) ? 0 : this._z)
  }

  private _stackHeight: number

  public get stackHeight(): number {
    return ((isNaN(this._stackHeight)) ? 0 : this._stackHeight)
  }

  private _extra: number

  public get extra(): number {
    return this._extra
  }

  private _data: IObjectData

  public get data(): IObjectData {
    return this._data
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _expires: number

  public get expires(): number {
    return this._expires
  }

  private _usagePolicy: number

  public get usagePolicy(): number {
    return this._usagePolicy
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _username: string

  public get username(): string {
    return this._username
  }

  public set username(username: string) {
    this._username = username
  }

  public flush(): boolean {
    this._itemId = 0
    this._spriteId = 0
    this._spriteName = null
    this._x = 0
    this._y = 0
    this._direction = 0
    this._z = 0
    this._stackHeight = 0
    this._extra = 0
    this._data = null
    this._state = 0
    this._expires = 0
    this._usagePolicy = 0
    this._userId = 0
    this._username = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = wrapper.readInt()
    this._spriteId = wrapper.readInt()
    this._x = wrapper.readInt()
    this._y = wrapper.readInt()
    this._direction = ((wrapper.readInt() % 8) * 45)
    this._z = parseFloat(wrapper.readString())
    this._stackHeight = parseFloat(wrapper.readString())
    this._extra = wrapper.readInt()
    this._data = FurnitureDataParser.parseObjectData(wrapper)
    this._state = parseFloat(this._data && this._data.getLegacyString()) || 0
    this._expires = wrapper.readInt()
    this._usagePolicy = wrapper.readInt()
    this._userId = wrapper.readInt()
    this._username = null

    if (this._spriteId < 0) this._spriteName = wrapper.readString()

    return true
  }
}
