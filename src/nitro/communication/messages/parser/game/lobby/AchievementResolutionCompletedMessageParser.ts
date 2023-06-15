import { IMessageDataWrapper, IMessageParser } from '@/api'

export class AchievementResolutionCompletedMessageParser implements IMessageParser {
  private _stuffCode: string

  public get stuffCode(): string {
    return this._stuffCode
  }

  private _badgeCode: string

  public get badgeCode(): string {
    return this._badgeCode
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._stuffCode = wrapper.readString()
    this._badgeCode = wrapper.readString()

    return true
  }
}
