import { IMessageDataWrapper } from '@/api'

export class ModeratorUserInfoData {
  constructor(wrapper: IMessageDataWrapper) {
    this._userId = wrapper.readInt()
    this._userName = wrapper.readString()
    this._figure = wrapper.readString()
    this._registrationAgeInMinutes = wrapper.readInt()
    this._minutesSinceLastLogin = wrapper.readInt()
    this._online = wrapper.readBoolean()
    this._cfhCount = wrapper.readInt()
    this._abusiveCfhCount = wrapper.readInt()
    this._cautionCount = wrapper.readInt()
    this._banCount = wrapper.readInt()
    this._tradingLockCount = wrapper.readInt()
    this._tradingExpiryDate = wrapper.readString()
    this._lastPurchaseDate = wrapper.readString()
    this._identityId = wrapper.readInt()
    this._identityRelatedBanCount = wrapper.readInt()
    this._primaryEmailAddress = wrapper.readString()
    this._userClassification = wrapper.readString()
    if (wrapper.bytesAvailable) {
      this._lastSanctionTime = wrapper.readString()
      this._sanctionAgeHours = wrapper.readInt()
    }
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _userName: string

  public get userName(): string {
    return this._userName
  }

  private _registrationAgeInMinutes: number

  public get registrationAgeInMinutes(): number {
    return this._registrationAgeInMinutes
  }

  private _minutesSinceLastLogin: number

  public get minutesSinceLastLogin(): number {
    return this._minutesSinceLastLogin
  }

  private _online: boolean

  public get online(): boolean {
    return this._online
  }

  private _cfhCount: number

  public get cfhCount(): number {
    return this._cfhCount
  }

  private _abusiveCfhCount: number

  public get abusiveCfhCount(): number {
    return this._abusiveCfhCount
  }

  private _cautionCount: number

  public get cautionCount(): number {
    return this._cautionCount
  }

  private _banCount: number

  public get banCount(): number {
    return this._banCount
  }

  private _tradingLockCount: number

  public get tradingLockCount(): number {
    return this._tradingLockCount
  }

  private _tradingExpiryDate: string

  public get tradingExpiryDate(): string {
    return this._tradingExpiryDate
  }

  private _lastPurchaseDate: string

  public get lastPurchaseDate(): string {
    return this._lastPurchaseDate
  }

  private _identityId: number

  public get identityId(): number {
    return this._identityId
  }

  private _identityRelatedBanCount: number

  public get identityRelatedBanCount(): number {
    return this._identityRelatedBanCount
  }

  private _primaryEmailAddress: string

  public get primaryEmailAddress(): string {
    return this._primaryEmailAddress
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _userClassification: string

  public get userClassification(): string {
    return this._userClassification
  }

  private _lastSanctionTime: string = ''

  public get lastSanctionTime(): string {
    return this._lastSanctionTime
  }

  private _sanctionAgeHours: number = 0

  public get sanctionAgeHours(): number {
    return this._sanctionAgeHours
  }
}
