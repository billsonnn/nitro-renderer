import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FurniRentOrBuyoutOfferMessageParser } from '@/nitro'

export class FurniRentOrBuyoutOfferMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FurniRentOrBuyoutOfferMessageParser)
  }

  public getParser(): FurniRentOrBuyoutOfferMessageParser {
    return this.parser as FurniRentOrBuyoutOfferMessageParser
  }
}
