import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { InstantMessageErrorParser } from '@/nitro'

export class InstantMessageErrorEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, InstantMessageErrorParser)
  }

  public getParser(): InstantMessageErrorParser {
    return this.parser as InstantMessageErrorParser
  }
}
