import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { NoobnessLevelMessageParser } from '@/nitro'

export class NoobnessLevelMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, NoobnessLevelMessageParser)
  }

  public getParser(): NoobnessLevelMessageParser {
    return this.parser as NoobnessLevelMessageParser
  }
}
