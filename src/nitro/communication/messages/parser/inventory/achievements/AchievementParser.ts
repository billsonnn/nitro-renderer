import { IMessageDataWrapper, IMessageParser } from '@/api'
import { AchievementData } from '@/nitro'

export class AchievementParser implements IMessageParser {
  private _achievement: AchievementData

  public get achievement(): AchievementData {
    return this._achievement
  }

  public flush(): boolean {
    this._achievement = null

    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    if (!k) return false

    this._achievement = new AchievementData(k)

    return true
  }
}
