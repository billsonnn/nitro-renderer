import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UnseenItemsParser } from '@/nitro'

export class UnseenItemsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UnseenItemsParser)
  }

  public getParser(): UnseenItemsParser {
    return this.parser as UnseenItemsParser
  }
}
