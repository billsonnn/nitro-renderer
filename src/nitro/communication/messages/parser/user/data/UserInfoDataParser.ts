import { IMessageDataWrapper } from '@/api'

export class UserInfoDataParser {
  private _lastAccessDate: string

  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _username: string

  public get username(): string {
    return this._username
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _gender: string

  public get gender(): string {
    return this._gender
  }

  private _motto: string

  public get motto(): string {
    return this._motto
  }

  private _realName: string

  public get realName(): string {
    return this._realName
  }

  private _directMail: boolean

  public get directMail(): boolean {
    return this._directMail
  }

  private _respectsReceived: number

  public get respectsReceived(): number {
    return this._respectsReceived
  }

  private _respectsRemaining: number

  public get respectsRemaining(): number {
    return this._respectsRemaining
  }

  private _respectsPetRemaining: number

  public get respectsPetRemaining(): number {
    return this._respectsPetRemaining
  }

  private _streamPublishingAllowed: boolean

  public get streamPublishingAllowed(): boolean {
    return this._streamPublishingAllowed
  }

  private _canChangeName: boolean

  public get canChangeName(): boolean {
    return this._canChangeName
  }

  private _safetyLocked: boolean

  public get safetyLocked(): boolean {
    return this._safetyLocked
  }

  public get lastAccessedDate(): string {
    return this._lastAccessDate
  }

  public flush(): boolean {
    this._userId = 0
    this._username = null
    this._figure = null
    this._gender = null
    this._motto = null
    this._realName = null
    this._directMail = false
    this._respectsReceived = 0
    this._respectsRemaining = 0
    this._respectsPetRemaining = 0
    this._streamPublishingAllowed = false
    this._lastAccessDate = null
    this._canChangeName = false
    this._safetyLocked = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userId = wrapper.readInt()
    this._username = wrapper.readString()
    this._figure = wrapper.readString()
    this._gender = wrapper.readString()
    this._motto = wrapper.readString()
    this._realName = wrapper.readString()
    this._directMail = wrapper.readBoolean()
    this._respectsReceived = wrapper.readInt()
    this._respectsRemaining = wrapper.readInt()
    this._respectsPetRemaining = wrapper.readInt()
    this._streamPublishingAllowed = wrapper.readBoolean()
    this._lastAccessDate = wrapper.readString()
    this._canChangeName = wrapper.readBoolean()
    this._safetyLocked = wrapper.readBoolean()

    return true
  }
}
