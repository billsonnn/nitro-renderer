import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ApproveNameResultParser implements IMessageParser {
  private _result: number

  public get result(): number {
    return this._result
  }

  private _validationInfo: string

  public get validationInfo(): string {
    return this._validationInfo
  }

  public flush(): boolean {
    this._result = -1
    this._validationInfo = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._result = wrapper.readInt()
    this._validationInfo = wrapper.readString()

    return true
  }
}
