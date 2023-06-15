import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TradingNotOpenParser } from '@/nitro'

export class TradingNotOpenEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TradingNotOpenParser)
  }

  public getParser(): TradingNotOpenParser {
    return this.parser as TradingNotOpenParser
  }
}
