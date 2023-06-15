import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GuideTicketCreationResultMessageParser } from '@/nitro'

export class GuideTicketCreationResultMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GuideTicketCreationResultMessageParser)
  }

  public getParser(): GuideTicketCreationResultMessageParser {
    return this.parser as GuideTicketCreationResultMessageParser
  }
}
