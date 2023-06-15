import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TradingAcceptParser implements IMessageParser {
  private _userID: number

  public get userID(): number {
    return this._userID
  }

  private _userAccepts: boolean

  public get userAccepts(): boolean {
    return this._userAccepts
  }

  public flush(): boolean {
    this._userID = -1
    this._userAccepts = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userID = wrapper.readInt()
    this._userAccepts = (wrapper.readInt() > 0)

    return true
  }
}
