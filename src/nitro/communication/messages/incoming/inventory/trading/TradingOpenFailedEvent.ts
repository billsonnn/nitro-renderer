import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TradingOpenFailedParser } from '@/nitro'

export class TradingOpenFailedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TradingOpenFailedParser)
  }

  public getParser(): TradingOpenFailedParser {
    return this.parser as TradingOpenFailedParser
  }
}
