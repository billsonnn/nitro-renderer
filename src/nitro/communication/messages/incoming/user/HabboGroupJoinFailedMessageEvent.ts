import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { HabboGroupJoinFailedMessageParser } from '@/nitro'

export class HabboGroupJoinFailedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, HabboGroupJoinFailedMessageParser)
  }

  public getParser(): HabboGroupJoinFailedMessageParser {
    return this.parser as HabboGroupJoinFailedMessageParser
  }
}
