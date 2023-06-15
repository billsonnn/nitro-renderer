import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CompetitionEntrySubmitResultMessageParser } from '@/nitro'

export class CompetitionEntrySubmitResultEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CompetitionEntrySubmitResultMessageParser)
  }

  public getParser(): CompetitionEntrySubmitResultMessageParser {
    return this.parser as CompetitionEntrySubmitResultMessageParser
  }
}
