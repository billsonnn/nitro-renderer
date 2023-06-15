import { IMessageDataWrapper, IMessageParser } from '@/api'

export class DirectSMSClubBuyAvailableMessageParser implements IMessageParser {
  private _available: boolean

  public get available(): boolean {
    return this._available
  }

  private _pricePointUrl: string

  public get pricePointUrl(): string {
    return this._pricePointUrl
  }

  private _market: string

  public get market(): string {
    return this._market
  }

  private _lengthInDays: number

  public get lengthInDays(): number {
    return this._lengthInDays
  }

  public flush(): boolean {
    this._available = false
    this._pricePointUrl = null
    this._market = null
    this._lengthInDays = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._pricePointUrl = wrapper.readString()

    if (this._pricePointUrl !== '') this._available = true

    this._market = wrapper.readString()
    this._lengthInDays = wrapper.readInt()

    return true
  }
}
