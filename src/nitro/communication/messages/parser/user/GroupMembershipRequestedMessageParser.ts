import { IMessageDataWrapper, IMessageParser } from '@/api'
import { MemberData } from '@/nitro'

export class GroupMembershipRequestedMessageParser implements IMessageParser {
  private _groupId: number

  public get groupId(): number {
    return this._groupId
  }

  private _requester: MemberData

  public get requester(): MemberData {
    return this._requester
  }

  public flush(): boolean {
    this._groupId = -1
    this._requester = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._groupId = wrapper.readInt()
    this._requester = new MemberData(wrapper)

    return true
  }
}
