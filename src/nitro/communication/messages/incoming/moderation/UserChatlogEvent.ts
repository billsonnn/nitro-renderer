import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UserChatlogMessageParser } from '@/nitro'

export class UserChatlogEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UserChatlogMessageParser)
  }

  public getParser(): UserChatlogMessageParser {
    return this.parser as UserChatlogMessageParser
  }
}
