import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PerkAllowancesMessageParser } from '@/nitro'

export class PerkAllowancesMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PerkAllowancesMessageParser)
  }

  public getParser(): PerkAllowancesMessageParser {
    return this.parser as PerkAllowancesMessageParser
  }
}
