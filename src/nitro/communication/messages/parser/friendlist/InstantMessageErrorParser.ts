import { IMessageDataWrapper, IMessageParser } from '@/api'

export class InstantMessageErrorParser implements IMessageParser {
  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _message: string

  public get message(): string {
    return this._message
  }

  public flush(): boolean {
    this._errorCode = 0
    this._userId = 0
    this._message = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._errorCode = wrapper.readInt()
    this._userId = wrapper.readInt()
    this._message = wrapper.readString()

    return true
  }
}
