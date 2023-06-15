import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RequestSpamWallPostItMessageParser implements IMessageParser {
  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _location: string

  public get location(): string {
    return this._location
  }

  public flush(): boolean {
    this._itemId = -1
    this._location = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = wrapper.readInt()
    this._location = wrapper.readString()

    return true
  }
}
