﻿import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TradingConfirmationParser } from '@/nitro'

export class TradingConfirmationEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TradingConfirmationParser)
  }

  public getParser(): TradingConfirmationParser {
    return this.parser as TradingConfirmationParser
  }
}
