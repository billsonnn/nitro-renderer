import { IMessageDataWrapper, IMessageParser } from '@/api'
import { AchievementData } from '@/nitro'

export class AchievementsParser implements IMessageParser {
  private _achievements: AchievementData[]

  public get achievements(): AchievementData[] {
    return this._achievements
  }

  private _defaultCategory: string

  public get defaultCategory(): string {
    return this._defaultCategory
  }

  public flush(): boolean {
    this._achievements = []
    this._defaultCategory = null

    return true
  }

  public parse(k: IMessageDataWrapper): boolean {
    if (!k) return false

    this._achievements = []

    let totalCount = k.readInt()

    while (totalCount > 0) {
      this._achievements.push(new AchievementData(k))

      totalCount--
    }

    this._defaultCategory = k.readString()

    return true
  }
}
