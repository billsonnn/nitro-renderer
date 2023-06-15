import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TradingOpenParser implements IMessageParser {
  private _userId: number
  private _otherUserId: number

  private _userCanTrade: boolean

  public get userCanTrade(): boolean {
    return this._userCanTrade
  }

  private _otherUserCanTrade: boolean

  public get otherUserCanTrade(): boolean {
    return this._otherUserCanTrade
  }

  public get userID(): number {
    return this._userId
  }

  public get otherUserID(): number {
    return this._otherUserId
  }

  public flush(): boolean {
    this._userId = -1
    this._userCanTrade = false
    this._otherUserId = -1
    this._otherUserCanTrade = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userId = wrapper.readInt()
    this._userCanTrade = (wrapper.readInt() === 1)
    this._otherUserId = wrapper.readInt()
    this._otherUserCanTrade = (wrapper.readInt() === 1)

    return true
  }
}
