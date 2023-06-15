import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CompetitionRoomsDataMessageParser } from '@/nitro'

export class CompetitionRoomsDataMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CompetitionRoomsDataMessageParser)
  }

  public getParser(): CompetitionRoomsDataMessageParser {
    return this.parser as CompetitionRoomsDataMessageParser
  }
}
