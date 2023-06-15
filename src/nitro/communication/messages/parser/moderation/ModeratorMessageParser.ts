import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ModeratorMessageParser implements IMessageParser {
  private _message: string

  public get message(): string {
    return this._message
  }

  private _url: string

  public get url(): string {
    return this._url
  }

  public flush(): boolean {
    this._message = ''
    this._url = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._message = wrapper.readString()
    this._url = wrapper.readString()

    return true
  }
}
