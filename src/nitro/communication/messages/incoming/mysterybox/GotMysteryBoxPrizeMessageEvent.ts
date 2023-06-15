import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GotMysteryBoxPrizeMessageParser } from '@/nitro'

export class GotMysteryBoxPrizeMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GotMysteryBoxPrizeMessageParser)
  }

  public getParser(): GotMysteryBoxPrizeMessageParser {
    return this.parser as GotMysteryBoxPrizeMessageParser
  }
}
