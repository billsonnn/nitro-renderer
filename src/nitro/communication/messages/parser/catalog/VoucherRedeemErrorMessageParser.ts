import { IMessageDataWrapper, IMessageParser } from '@/api'

export class VoucherRedeemErrorMessageParser implements IMessageParser {
  private _errorCode: string = ''

  public get errorCode(): string {
    return this._errorCode
  }

  public flush(): boolean {
    this._errorCode = ''
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._errorCode = wrapper.readString()

    return true
  }
}
