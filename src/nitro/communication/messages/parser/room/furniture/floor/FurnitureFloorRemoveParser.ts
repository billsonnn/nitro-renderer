import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FurnitureFloorRemoveParser implements IMessageParser {
  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _isExpired: boolean

  public get isExpired(): boolean {
    return this._isExpired
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _delay: number

  public get delay(): number {
    return this._delay
  }

  public flush(): boolean {
    this._itemId = 0
    this._isExpired = true
    this._userId = 0
    this._delay = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = parseInt(wrapper.readString())
    this._isExpired = wrapper.readBoolean()
    this._userId = wrapper.readInt()
    this._delay = wrapper.readInt()

    return true
  }
}
