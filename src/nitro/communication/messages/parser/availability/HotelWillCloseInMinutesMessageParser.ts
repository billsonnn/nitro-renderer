import { IMessageDataWrapper, IMessageParser } from '@/api'

export class HotelWillCloseInMinutesMessageParser implements IMessageParser {
  private _minutes: number

  public get openMinute(): number {
    return this._minutes
  }

  public flush(): boolean {
    this._minutes = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._minutes = wrapper.readInt()

    return true
  }
}
