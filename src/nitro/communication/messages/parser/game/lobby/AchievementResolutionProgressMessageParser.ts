import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AchievementResolutionProgressMessageParser implements IMessageParser {
  private _stuffId: number

  public get stuffId(): number {
    return this._stuffId
  }

  private _achievementId: number

  public get achievementId(): number {
    return this._achievementId
  }

  private _requiredLevelBadgeCode: string

  public get requiredLevelBadgeCode(): string {
    return this._requiredLevelBadgeCode
  }

  private _userProgress: number

  public get userProgress(): number {
    return this._userProgress
  }

  private _totalProgress: number

  public get totalProgress(): number {
    return this._totalProgress
  }

  private _endTime: number

  public get endTime(): number {
    return this._endTime
  }

  public flush(): boolean {
    this._stuffId = -1
    this._achievementId = 0
    this._requiredLevelBadgeCode = ''
    this._userProgress = 0
    this._totalProgress = 0
    this._endTime = 0
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._stuffId = wrapper.readInt()
    this._achievementId = wrapper.readInt()
    this._requiredLevelBadgeCode = wrapper.readString()
    this._userProgress = wrapper.readInt()
    this._totalProgress = wrapper.readInt()
    this._endTime = wrapper.readInt()

    return true
  }
}
