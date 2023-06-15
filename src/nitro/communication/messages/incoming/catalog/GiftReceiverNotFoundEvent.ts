import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GiftReceiverNotFoundParser } from '@/nitro'

export class GiftReceiverNotFoundEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GiftReceiverNotFoundParser)
  }

  public getParser(): GiftReceiverNotFoundParser {
    return this.parser as GiftReceiverNotFoundParser
  }
}
