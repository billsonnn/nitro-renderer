import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { MarketplaceOwnOffersParser } from '@/nitro'

export class MarketplaceOwnOffersEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, MarketplaceOwnOffersParser)
  }

  public getParser(): MarketplaceOwnOffersParser {
    return this.parser as MarketplaceOwnOffersParser
  }
}
