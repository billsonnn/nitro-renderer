import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RemainingMuteParser } from '@/nitro'

export class RemainingMuteEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RemainingMuteParser)
  }

  public getParser(): RemainingMuteParser {
    return this.parser as RemainingMuteParser
  }
}
