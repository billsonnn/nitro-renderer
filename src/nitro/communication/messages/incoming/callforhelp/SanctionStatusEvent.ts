import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { SanctionStatusMessageParser } from '@/nitro'

export class SanctionStatusEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, SanctionStatusMessageParser)
  }

  public getParser(): SanctionStatusMessageParser {
    return this.parser as SanctionStatusMessageParser
  }
}
