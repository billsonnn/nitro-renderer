import { IMessageDataWrapper, IMessageParser } from '@/api'
import { HabboGroupEntryData } from '@/nitro'

export class UserProfileParser implements IMessageParser {
  private _id: number

  public get id(): number {
    return this._id
  }

  private _username: string

  public get username(): string {
    return this._username
  }

  private _figure: string

  public get figure(): string {
    return this._figure
  }

  private _motto: string

  public get motto(): string {
    return this._motto
  }

  private _registration: string

  public get registration(): string {
    return this._registration
  }

  private _achievementPoints: number

  public get achievementPoints(): number {
    return this._achievementPoints
  }

  private _friendsCount: number

  public get friendsCount(): number {
    return this._friendsCount
  }

  private _isMyFriend: boolean

  public get isMyFriend(): boolean {
    return this._isMyFriend
  }

  private _requestSent: boolean

  public get requestSent(): boolean {
    return this._requestSent
  }

  private _isOnline: boolean

  public get isOnline(): boolean {
    return this._isOnline
  }

  private _groups: HabboGroupEntryData[]

  public get groups(): HabboGroupEntryData[] {
    return this._groups
  }

  private _secondsSinceLastVisit: number

  public get secondsSinceLastVisit(): number {
    return this._secondsSinceLastVisit
  }

  private _openProfileWindow: boolean

  public get openProfileWindow(): boolean {
    return this._openProfileWindow
  }

  public flush(): boolean {
    this._id = 0
    this._username = null
    this._figure = null
    this._motto = null
    this._registration = null
    this._achievementPoints = 0
    this._friendsCount = 0
    this._isMyFriend = false
    this._requestSent = false
    this._isOnline = false
    this._groups = []
    this._secondsSinceLastVisit = 0
    this._openProfileWindow = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._id = wrapper.readInt()
    this._username = wrapper.readString()
    this._figure = wrapper.readString()
    this._motto = wrapper.readString()
    this._registration = wrapper.readString()
    this._achievementPoints = wrapper.readInt()
    this._friendsCount = wrapper.readInt()
    this._isMyFriend = wrapper.readBoolean()
    this._requestSent = wrapper.readBoolean()
    this._isOnline = wrapper.readBoolean()
    const groupsCount = wrapper.readInt()

    for (let i = 0; i < groupsCount; i++) {
      this._groups.push(new HabboGroupEntryData(wrapper))
    }

    this._secondsSinceLastVisit = wrapper.readInt()
    this._openProfileWindow = wrapper.readBoolean()

    return true
  }
}
