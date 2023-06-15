import { IMessageDataWrapper } from '@/api'

export class AchievementResolutionData {
  public static STATE_SELECTABLE: number = 0

  constructor(wrapper: IMessageDataWrapper) {
    this._achievementId = wrapper.readInt()
    this._level = wrapper.readInt()
    this._badgeId = wrapper.readString()
    this._requiredLevel = wrapper.readInt()
    this._state = wrapper.readInt()
  }

  private _achievementId: number

  public get achievementId(): number {
    return this._achievementId
  }

  private _level: number

  public get level(): number {
    return this._level
  }

  private _badgeId: string

  public get badgeId(): string {
    return this._badgeId
  }

  private _requiredLevel: number

  public get requiredLevel(): number {
    return this._requiredLevel
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  public get enabled(): boolean {
    return (this._state === AchievementResolutionData.STATE_SELECTABLE)
  }

  public dispose(): void {
    this._achievementId = 0
    this._level = 0
    this._badgeId = ''
    this._requiredLevel = 0
  }
}
