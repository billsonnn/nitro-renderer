import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GroupConfirmMemberRemoveParser } from '@/nitro'

export class GroupConfirmMemberRemoveEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GroupConfirmMemberRemoveParser)
  }

  public getParser(): GroupConfirmMemberRemoveParser {
    return this.parser as GroupConfirmMemberRemoveParser
  }
}
