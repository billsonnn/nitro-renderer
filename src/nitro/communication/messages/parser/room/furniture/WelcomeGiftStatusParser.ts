import { IMessageDataWrapper, IMessageParser } from '@/api'

export class WelcomeGiftStatusParser implements IMessageParser {
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

  private _furniId: number

  public get furniId(): number {
    return this._furniId
  }

  private _requestedByUser: boolean

  public get requestedByUser(): boolean {
    return this._requestedByUser
  }

  public flush(): boolean {
    this._email = null
    this._isVerified = false
    this._allowChange = false
    this._furniId = -1
    this._requestedByUser = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._email = wrapper.readString()
    this._isVerified = wrapper.readBoolean()
    this._allowChange = wrapper.readBoolean()
    this._furniId = wrapper.readInt()
    this._requestedByUser = wrapper.readBoolean()

    return true
  }
}
