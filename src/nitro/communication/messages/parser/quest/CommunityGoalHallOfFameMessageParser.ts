import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CommunityGoalHallOfFameData } from '@/nitro'

export class CommunityGoalHallOfFameMessageParser implements IMessageParser {
  private _data: CommunityGoalHallOfFameData

  public get data(): CommunityGoalHallOfFameData {
    return this._data
  }

  public flush(): boolean {
    this._data = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new CommunityGoalHallOfFameData(wrapper)
    return true
  }
}
