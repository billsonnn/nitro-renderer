import { IMessageDataWrapper, IMessageParser } from '@/api'

export class HotelClosedAndOpensMessageParser implements IMessageParser {
  private _openHour: number

  public get openHour(): number {
    return this._openHour
  }

  private _openMinute: number

  public get openMinute(): number {
    return this._openMinute
  }

  public flush(): boolean {
    this._openHour = 0
    this._openMinute = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._openHour = wrapper.readInt()
    this._openMinute = wrapper.readInt()

    return true
  }
}
