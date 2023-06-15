import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FlatAccessDeniedMessageParser implements IMessageParser {
  private _userName: string

  public get userName(): string {
    return this._userName
  }

  public flush(): boolean {
    this._userName = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userName = wrapper.readString()

    return true
  }
}
