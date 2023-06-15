import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { EmailStatusParser } from '@/nitro'

export class EmailStatusResultEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, EmailStatusParser)
  }

  public getParser(): EmailStatusParser {
    return this.parser as EmailStatusParser
  }
}
