import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { MiniMailUnreadCountParser } from '@/nitro'

export class MiniMailUnreadCountEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, MiniMailUnreadCountParser)
  }

  public getParser(): MiniMailUnreadCountParser {
    return this.parser as MiniMailUnreadCountParser
  }
}
