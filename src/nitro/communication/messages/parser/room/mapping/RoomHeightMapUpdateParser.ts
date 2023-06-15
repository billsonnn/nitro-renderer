import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomHeightMapParser } from '@/nitro'

export class RoomHeightMapUpdateParser implements IMessageParser {
  private _wrapper: IMessageDataWrapper
  private _count: number
  private _value: number

  private _x: number

  public get x(): number {
    return this._x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  public get height(): number {
    return this._value
  }

  public flush(): boolean {
    this._wrapper = null
    this._count = 0
    this._x = 0
    this._y = 0
    this._value = 0

    return true
  }

  public tileHeight(): number {
    return RoomHeightMapParser.decodeTileHeight(this._value)
  }

  public isStackingBlocked(): boolean {
    return RoomHeightMapParser.decodeIsStackingBlocked(this._value)
  }

  public isRoomTile(): boolean {
    return RoomHeightMapParser.decodeIsRoomTile(this._value)
  }

  public next(): boolean {
    if (!this._count) return false

    this._count--

    this._x = this._wrapper.readByte()
    this._y = this._wrapper.readByte()
    this._value = this._wrapper.readShort()

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._wrapper = wrapper
    this._count = wrapper.readByte()

    return true
  }
}
