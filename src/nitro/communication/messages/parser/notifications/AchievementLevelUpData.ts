import { IMessageDataWrapper } from '@/api'

export class AchievementLevelUpData {
  constructor(wrapper: IMessageDataWrapper) {
    this._type = wrapper.readInt()
    this._level = wrapper.readInt()
    this._badgeId = wrapper.readInt()
    this._badgeCode = wrapper.readString()
    this._points = wrapper.readInt()
    this._levelRewardPoints = wrapper.readInt()
    this._levelRewardPointType = wrapper.readInt()
    this._bonusPoints = wrapper.readInt()
    this._achievementID = wrapper.readInt()
    this._removedBadgeCode = wrapper.readString()
    this._category = wrapper.readString()
    this._showDialogToUser = wrapper.readBoolean()
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _points: number

  public get points(): number {
    return this._points
  }

  private _levelRewardPoints: number

  public get levelRewardPoints(): number {
    return this._levelRewardPoints
  }

  private _levelRewardPointType: number

  public get levelRewardPointType(): number {
    return this._levelRewardPointType
  }

  private _bonusPoints: number

  public get bonusPoints(): number {
    return this._bonusPoints
  }

  private _badgeId: number

  public get badgeId(): number {
    return this._badgeId
  }

  private _badgeCode: string = ''

  public get badgeCode(): string {
    return this._badgeCode
  }

  private _removedBadgeCode: string = ''

  public get removedBadgeCode(): string {
    return this._removedBadgeCode
  }

  private _achievementID: number

  public get achievementID(): number {
    return this._achievementID
  }

  private _category: string

  public get category(): string {
    return this._category
  }

  private _showDialogToUser: boolean

  public get showDialogToUser(): boolean {
    return this._showDialogToUser
  }
}
