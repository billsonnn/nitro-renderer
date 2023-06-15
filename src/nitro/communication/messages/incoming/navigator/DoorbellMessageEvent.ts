import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { DoorbellMessageParser } from '@/nitro'

export class DoorbellMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, DoorbellMessageParser)
  }

  public get userName(): string {
    return this.getParser().userName
  }

  public getParser(): DoorbellMessageParser {
    return this.parser as DoorbellMessageParser
  }
}
