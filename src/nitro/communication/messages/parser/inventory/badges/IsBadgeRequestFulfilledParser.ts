import { IMessageDataWrapper, IMessageParser } from '@/api'

export class IsBadgeRequestFulfilledParser implements IMessageParser {
  private _requestCode: string

  public get requestCode(): string {
    return this._requestCode
  }

  private _fulfilled: boolean

  public get fulfilled(): boolean {
    return this._fulfilled
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._requestCode = wrapper.readString()
    this._fulfilled = wrapper.readBoolean()

    return true
  }
}
