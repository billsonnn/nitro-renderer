import { IMessageDataWrapper, IMessageParser } from '@/api'

export class SanctionStatusMessageParser implements IMessageParser {
  private _isSanctionNew: boolean

  public get isSanctionNew(): boolean {
    return this._isSanctionNew
  }

  private _isSanctionActive: boolean

  public get isSanctionActive(): boolean {
    return this._isSanctionActive
  }

  private _sanctionName: string

  public get sanctionName(): string {
    return this._sanctionName
  }

  private _sanctionLengthHours: number

  public get sanctionLengthHours(): number {
    return this._sanctionLengthHours
  }

  private _sanctionReason: string

  public get sanctionReason(): string {
    return this._sanctionReason
  }

  private _sanctionCreationTime: string

  public get sanctionCreationTime(): string {
    return this._sanctionCreationTime
  }

  private _probationHoursLeft: number

  public get probationHoursLeft(): number {
    return this._probationHoursLeft
  }

  private _nextSanctionName: string

  public get nextSanctionName(): string {
    return this._nextSanctionName
  }

  private _nextSanctionLengthHours: number

  public get nextSanctionLengthHours(): number {
    return this._nextSanctionLengthHours
  }

  private _hasCustomMute: boolean

  public get hasCustomMute(): boolean {
    return this._hasCustomMute
  }

  private _tradeLockExpiryTime: string

  public get tradeLockExpiryTime(): string {
    return this._tradeLockExpiryTime
  }

  public flush(): boolean {
    this._isSanctionNew = false
    this._isSanctionActive = false
    this._sanctionName = null
    this._sanctionLengthHours = 0
    this._sanctionReason = null
    this._sanctionCreationTime = null
    this._probationHoursLeft = 0
    this._nextSanctionName = null
    this._nextSanctionLengthHours = 0
    this._hasCustomMute = false
    this._tradeLockExpiryTime = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._isSanctionNew = wrapper.readBoolean()
    this._isSanctionActive = wrapper.readBoolean()
    this._sanctionName = wrapper.readString()
    this._sanctionLengthHours = wrapper.readInt()

    wrapper.readInt()

    this._sanctionReason = wrapper.readString()
    this._sanctionCreationTime = wrapper.readString()
    this._probationHoursLeft = wrapper.readInt()
    this._nextSanctionName = wrapper.readString()
    this._nextSanctionLengthHours = wrapper.readInt()

    wrapper.readInt()

    this._hasCustomMute = wrapper.readBoolean()

    if (wrapper.bytesAvailable) this._tradeLockExpiryTime = wrapper.readString()

    return true
  }
}
