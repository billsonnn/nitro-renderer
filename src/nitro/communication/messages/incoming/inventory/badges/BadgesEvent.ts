import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { BadgesParser } from '@/nitro'

export class BadgesEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, BadgesParser)
  }

  public getParser(): BadgesParser {
    return this.parser as BadgesParser
  }
}
