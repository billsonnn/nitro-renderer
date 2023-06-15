import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GroupPurchasedParser } from '@/nitro'

export class GroupPurchasedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GroupPurchasedParser)
  }

  public getParser(): GroupPurchasedParser {
    return this.parser as GroupPurchasedParser
  }
}
