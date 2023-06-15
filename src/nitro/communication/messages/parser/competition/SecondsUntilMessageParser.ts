import { IMessageDataWrapper, IMessageParser } from '@/api'

export class SecondsUntilMessageParser implements IMessageParser {
  private _timeStr: string

  public get timeStr(): string {
    return this._timeStr
  }

  private _secondsUntil: number

  public get secondsUntil(): number {
    return this._secondsUntil
  }

  public flush(): boolean {
    this._timeStr = null
    this._secondsUntil = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._timeStr = wrapper.readString()
    this._secondsUntil = wrapper.readInt()

    return true
  }
}
