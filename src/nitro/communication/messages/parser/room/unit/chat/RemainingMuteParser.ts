import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RemainingMuteParser implements IMessageParser {
  private _seconds: number

  public get seconds(): number {
    return this._seconds
  }

  public flush(): boolean {
    this._seconds = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._seconds = wrapper.readInt()

    return true
  }
}
