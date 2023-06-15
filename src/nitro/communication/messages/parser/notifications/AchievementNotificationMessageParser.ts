import { IMessageDataWrapper, IMessageParser } from '@/api'
import { AchievementLevelUpData } from '@/nitro'

export class AchievementNotificationMessageParser implements IMessageParser {
  private _data: AchievementLevelUpData

  public get data(): AchievementLevelUpData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new AchievementLevelUpData(wrapper)

    return true
  }
}
