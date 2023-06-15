import { IMessageDataWrapper, IMessageParser } from '@/api'
import { AchievementResolutionData } from '@/nitro'

export class AchievementResolutionsMessageParser implements IMessageParser {
  private _stuffId: number

  public get stuffId(): number {
    return this._stuffId
  }

  private _achievements: AchievementResolutionData[]

  public get achievements(): AchievementResolutionData[] {
    return this._achievements
  }

  private _endTime: number

  public get endTime(): number {
    return this._endTime
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._stuffId = wrapper.readInt()
    const count = wrapper.readInt()
    let _local_3 = 0
    while (_local_3 < count) {
      this._achievements.push(new AchievementResolutionData(wrapper))
      _local_3++
    }
    this._endTime = wrapper.readInt()

    return true
  }
}
