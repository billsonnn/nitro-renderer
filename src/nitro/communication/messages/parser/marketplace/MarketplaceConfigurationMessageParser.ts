import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MarketplaceConfigurationMessageParser implements IMessageParser {
  private _enabled: boolean

  public get enabled(): boolean {
    return this._enabled
  }

  private _commission: number

  public get commission(): number {
    return this._commission
  }

  private _credits: number

  public get credits(): number {
    return this._credits
  }

  private _advertisements: number

  public get advertisements(): number {
    return this._advertisements
  }

  private _maximumPrice: number

  public get maximumPrice(): number {
    return this._maximumPrice
  }

  private _minimumPrice: number

  public get minimumPrice(): number {
    return this._minimumPrice
  }

  private _offerTime: number

  public get offerTime(): number {
    return this._offerTime
  }

  private _displayTime: number

  public get displayTime(): number {
    return this._displayTime
  }

  public flush(): boolean {
    this._enabled = false
    this._commission = 0
    this._credits = 0
    this._advertisements = 0
    this._maximumPrice = 0
    this._minimumPrice = 0
    this._offerTime = 0
    this._displayTime = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._enabled = wrapper.readBoolean()
    this._commission = wrapper.readInt()
    this._credits = wrapper.readInt()
    this._advertisements = wrapper.readInt()
    this._minimumPrice = wrapper.readInt()
    this._maximumPrice = wrapper.readInt()
    this._offerTime = wrapper.readInt()
    this._displayTime = wrapper.readInt()

    return true
  }
}
