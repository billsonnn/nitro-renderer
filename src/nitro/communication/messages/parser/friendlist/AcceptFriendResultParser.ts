import { IMessageDataWrapper, IMessageParser } from '@/api'
import { AcceptFriendFailerData } from '@/nitro'

export class AcceptFriendResultParser implements IMessageParser {
  private _failuers: AcceptFriendFailerData[]

  public get failures(): AcceptFriendFailerData[] {
    return this._failuers
  }

  public flush(): boolean {
    this._failuers = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalFailures = wrapper.readInt()

    while (totalFailures > 0) {
      this._failuers.push(new AcceptFriendFailerData(wrapper))

      totalFailures--
    }

    return true
  }
}
