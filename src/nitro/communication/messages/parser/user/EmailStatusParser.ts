import { IMessageDataWrapper, IMessageParser } from '@/api'

export class EmailStatusParser implements IMessageParser {
  private _email: string

  public get email(): string {
    return this._email
  }

  private _isVerified: boolean

  public get isVerified(): boolean {
    return this._isVerified
  }

  private _allowChange: boolean

  public get allowChange(): boolean {
    return this._allowChange
  }

  public flush(): boolean {
    this._email = null
    this._isVerified = false
    this._allowChange = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._email = wrapper.readString()
    this._isVerified = wrapper.readBoolean()
    this._allowChange = wrapper.readBoolean()

    return true
  }
}
