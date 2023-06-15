import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PlayListMessageParser } from '@/nitro'

export class PlayListMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PlayListMessageParser)
  }

  public getParser(): PlayListMessageParser {
    return this.parser as PlayListMessageParser
  }
}
