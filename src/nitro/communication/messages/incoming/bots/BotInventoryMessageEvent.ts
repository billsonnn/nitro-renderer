import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { BotInventoryMessageParser } from '@/nitro'

export class BotInventoryMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, BotInventoryMessageParser)
  }

  public getParser(): BotInventoryMessageParser {
    return this.parser as BotInventoryMessageParser
  }
}
