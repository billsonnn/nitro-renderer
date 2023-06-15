import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CommunityVoteReceivedParser implements IMessageParser {
  private _acknowledged: boolean

  public get acknowledged(): boolean {
    return this._acknowledged
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false
    this._acknowledged = wrapper.readBoolean()
    return true
  }
}
