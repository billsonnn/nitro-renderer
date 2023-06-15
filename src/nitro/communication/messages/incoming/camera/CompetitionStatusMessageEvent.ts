import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CompetitionStatusMessageParser } from '@/nitro'

export class CompetitionStatusMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CompetitionStatusMessageParser)
  }

  public getParser(): CompetitionStatusMessageParser {
    return this.parser as CompetitionStatusMessageParser
  }
}
