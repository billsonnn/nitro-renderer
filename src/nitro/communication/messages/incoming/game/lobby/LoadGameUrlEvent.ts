import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { LoadGameUrlParser } from '@/nitro'

export class LoadGameUrlEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, LoadGameUrlParser)
  }

  public getParser(): LoadGameUrlParser {
    return this.parser as LoadGameUrlParser
  }
}
