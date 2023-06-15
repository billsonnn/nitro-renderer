import { IMessageDataWrapper, IMessageParser } from '@/api'

export class UserSubscriptionParser implements IMessageParser {
  public static readonly RESPONSE_TYPE_LOGIN: number = 1
  public static readonly RESPONSE_TYPE_PURCHASE: number = 2
  public static readonly RESPONSE_TYPE_DISCOUNT_AVAILABLE: number = 3
  public static readonly RESPONSE_TYPE_CITIZENSHIP_DISCOUNT: number = 4

  private _productName: string

  public get productName(): string {
    return this._productName
  }

  private _daysToPeriodEnd: number

  public get daysToPeriodEnd(): number {
    return this._daysToPeriodEnd
  }

  private _memberPeriods: number

  public get memberPeriods(): number {
    return this._memberPeriods
  }

  private _periodsSubscribedAhead: number

  public get periodsSubscribedAhead(): number {
    return this._periodsSubscribedAhead
  }

  private _responseType: number

  public get responseType(): number {
    return this._responseType
  }

  private _hasEverBeenMember: boolean

  public get hasEverBeenMember(): boolean {
    return this._hasEverBeenMember
  }

  private _isVip: boolean

  public get isVip(): boolean {
    return this._isVip
  }

  private _pastClubDays: number

  public get pastClubDays(): number {
    return this._pastClubDays
  }

  private _pastVipDays: number

  public get pastVipDays(): number {
    return this._pastVipDays
  }

  private _minutesUntilExpiration: number

  public get minutesUntilExpiration(): number {
    return this._minutesUntilExpiration
  }

  private _minutesSinceLastModified: number

  public get minutesSinceLastModified(): number {
    return this._minutesSinceLastModified
  }

  public flush(): boolean {
    this._productName = null
    this._daysToPeriodEnd = 0
    this._memberPeriods = 0
    this._periodsSubscribedAhead = 0
    this._responseType = 0
    this._hasEverBeenMember = false
    this._isVip = false
    this._pastClubDays = 0
    this._pastVipDays = 0
    this._minutesUntilExpiration = 0
    this._minutesSinceLastModified = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._productName = wrapper.readString()
    this._daysToPeriodEnd = wrapper.readInt()
    this._memberPeriods = wrapper.readInt()
    this._periodsSubscribedAhead = wrapper.readInt()
    this._responseType = wrapper.readInt()
    this._hasEverBeenMember = wrapper.readBoolean()
    this._isVip = wrapper.readBoolean()
    this._pastClubDays = wrapper.readInt()
    this._pastVipDays = wrapper.readInt()
    this._minutesUntilExpiration = wrapper.readInt()

    if (wrapper.bytesAvailable) this._minutesSinceLastModified = wrapper.readInt()

    return true
  }
}
