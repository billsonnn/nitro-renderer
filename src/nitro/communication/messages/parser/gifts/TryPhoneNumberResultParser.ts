import { IMessageDataWrapper, IMessageParser } from '@/api'

export class TryPhoneNumberResultParser implements IMessageParser {
  private _resultCode: number

  public get resultCode(): number {
    return this._resultCode
  }

  private _millisToAllowProcessReset: number

  public get millisToAllowProcessReset(): number {
    return this._millisToAllowProcessReset
  }

  public flush(): boolean {
    this._resultCode = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._resultCode = wrapper.readInt()
    this._millisToAllowProcessReset = wrapper.readInt()

    return true
  }
}
