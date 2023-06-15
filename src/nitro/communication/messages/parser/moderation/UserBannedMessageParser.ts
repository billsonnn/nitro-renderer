import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserBannedMessageParser implements IMessageParser {
  private _message: string

  public get message(): string {
    return this._message
  }

  public flush(): boolean {
    this._message = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._message = wrapper.readString()

    return true
  }
}
