import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { WiredOpenParser } from '@/nitro'

export class WiredOpenEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, WiredOpenParser)
  }

  public getParser(): WiredOpenParser {
    return this.parser as WiredOpenParser
  }
}
