import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { IsUserPartOfCompetitionMessageParser } from '@/nitro'

export class IsUserPartOfCompetitionMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, IsUserPartOfCompetitionMessageParser)
  }

  public getParser(): IsUserPartOfCompetitionMessageParser {
    return this.parser as IsUserPartOfCompetitionMessageParser
  }
}
