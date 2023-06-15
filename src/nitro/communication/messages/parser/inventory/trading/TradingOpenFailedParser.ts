﻿import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TradingOpenFailedParser implements IMessageParser {
  public static REASON_YOU_ARE_ALREADY_TRADING: number = 7
  public static REASON_OTHER_USER_ALREADY_TRADING: number = 8

  private _reason: number

  public get reason(): number {
    return this._reason
  }

  private _otherUserName: string

  public get otherUserName(): string {
    return this._otherUserName
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._reason = wrapper.readInt()
    this._otherUserName = wrapper.readString()

    return true
  }
}
