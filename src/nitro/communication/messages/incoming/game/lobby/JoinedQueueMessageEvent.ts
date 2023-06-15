import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { JoinedQueueMessageParser } from '@/nitro'

export class JoinedQueueMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, JoinedQueueMessageParser)
  }

  public getParser(): JoinedQueueMessageParser {
    return this.parser as JoinedQueueMessageParser
  }
}
