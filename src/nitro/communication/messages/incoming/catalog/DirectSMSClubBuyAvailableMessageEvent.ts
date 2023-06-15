import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { DirectSMSClubBuyAvailableMessageParser } from '@/nitro'

export class DirectSMSClubBuyAvailableMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, DirectSMSClubBuyAvailableMessageParser)
  }

  public getParser(): DirectSMSClubBuyAvailableMessageParser {
    return this.parser as DirectSMSClubBuyAvailableMessageParser
  }
}
