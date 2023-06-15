import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TryVerificationCodeResultParser implements IMessageParser {
  private _millisecondsToAllowProcessReset: number

  private _resultCode: number

  public get resultCode(): number {
    return this._resultCode
  }

  public get millisToAllowProcessReset(): number {
    return this._millisecondsToAllowProcessReset
  }

  public flush(): boolean {
    this._resultCode = -1
    this._millisecondsToAllowProcessReset = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._resultCode = wrapper.readInt()
    this._millisecondsToAllowProcessReset = wrapper.readInt()

    return true
  }
}
