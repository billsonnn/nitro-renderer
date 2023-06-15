import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TargetedOfferNotFoundParser } from '@/nitro'

export class TargetedOfferNotFoundEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TargetedOfferNotFoundParser)
  }

  public getParser(): TargetedOfferNotFoundParser {
    return this.parser as TargetedOfferNotFoundParser
  }
}
