import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CallForHelpReplyMessageParser implements IMessageParser {
  private _message: string

  public get message(): string {
    return this._message
  }

  flush(): boolean {
    this._message = null
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._message = wrapper.readString()
    return true
  }
}
