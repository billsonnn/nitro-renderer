import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GroupMembersParser } from '@/nitro'

export class GroupMembersEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GroupMembersParser)
  }

  public getParser(): GroupMembersParser {
    return this.parser as GroupMembersParser
  }
}
