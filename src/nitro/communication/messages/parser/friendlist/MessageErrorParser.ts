import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MessageErrorParser implements IMessageParser {
  private _clientMessageId: number

  public get clientMessageId(): number {
    return this._clientMessageId
  }

  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  public flush(): boolean {
    this._clientMessageId = 0
    this._errorCode = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._clientMessageId = wrapper.readInt()
    this._errorCode = wrapper.readInt()

    return true
  }
}
