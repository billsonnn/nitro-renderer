import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { LeftQueueMessageParser } from '@/nitro'

export class LeftQueueMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, LeftQueueMessageParser)
  }

  public getParser(): LeftQueueMessageParser {
    return this.parser as LeftQueueMessageParser
  }
}
