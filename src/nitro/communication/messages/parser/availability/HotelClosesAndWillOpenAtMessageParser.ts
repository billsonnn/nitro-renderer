import { IMessageDataWrapper, IMessageParser } from '@/api'

export class HotelClosesAndWillOpenAtMessageParser implements IMessageParser {
  private _userThrownOutAtClose: boolean

  private _openHour: number

  public get openHour(): number {
    return this._openHour
  }

  private _openMinute: number

  public get openMinute(): number {
    return this._openMinute
  }

  public get userThrowOutAtClose(): boolean {
    return this._userThrownOutAtClose
  }

  public flush(): boolean {
    this._openHour = 0
    this._openMinute = 0
    this._userThrownOutAtClose = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._openHour = wrapper.readInt()
    this._openMinute = wrapper.readInt()
    this._userThrownOutAtClose = wrapper.readBoolean()

    return true
  }
}
