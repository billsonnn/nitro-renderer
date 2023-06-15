import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RentableSpaceRentFailedMessageParser implements IMessageParser {
  private _reason: number

  public get reason(): number {
    return this._reason
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._reason = wrapper.readInt()

    return true
  }
}
