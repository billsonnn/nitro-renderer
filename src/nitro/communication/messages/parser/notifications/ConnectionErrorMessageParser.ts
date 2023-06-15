import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ConnectionErrorMessageParser implements IMessageParser {
  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  private _messageId: number

  public get messageId(): number {
    return this._messageId
  }

  private _timestamp: string

  public get timestamp(): string {
    return this._timestamp
  }

  public flush(): boolean {
    this._errorCode = 0
    this._messageId = 0
    this._timestamp = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._messageId = wrapper.readInt()
    this._errorCode = wrapper.readInt()
    this._timestamp = wrapper.readString()

    return true
  }
}
