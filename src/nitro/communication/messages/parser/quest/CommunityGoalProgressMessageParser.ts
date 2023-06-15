import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CommunityGoalData } from '@/nitro'

export class CommunityGoalProgressMessageParser implements IMessageParser {
  private _data: CommunityGoalData

  public get data(): CommunityGoalData {
    return this._data
  }

  public flush(): boolean {
    this._data = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new CommunityGoalData(wrapper)
    return true
  }
}
