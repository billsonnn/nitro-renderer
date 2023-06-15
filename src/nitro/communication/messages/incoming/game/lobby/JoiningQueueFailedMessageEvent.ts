import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { JoiningQueueFailedMessageParser } from '@/nitro'

export class JoiningQueueFailedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, JoiningQueueFailedMessageParser)
  }

  public getParser(): JoiningQueueFailedMessageParser {
    return this.parser as JoiningQueueFailedMessageParser
  }
}
