import { IMessageDataWrapper, IMessageParser } from '@/api'
import { HabboSearchResultData } from '@/nitro'

export class HabboSearchResultParser implements IMessageParser {
  private _friends: HabboSearchResultData[]

  public get friends(): HabboSearchResultData[] {
    return this._friends
  }

  private _others: HabboSearchResultData[]

  public get others(): HabboSearchResultData[] {
    return this._others
  }

  public flush(): boolean {
    this._friends = []
    this._others = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalFriends = wrapper.readInt()

    while (totalFriends > 0) {
      this._friends.push(new HabboSearchResultData(wrapper))

      totalFriends--
    }

    let totalOthers = wrapper.readInt()

    while (totalOthers > 0) {
      this._others.push(new HabboSearchResultData(wrapper))

      totalOthers--
    }

    return true
  }
}
