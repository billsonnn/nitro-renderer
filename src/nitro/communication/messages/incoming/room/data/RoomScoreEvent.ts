import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomScoreParser } from '@/nitro'

export class RoomScoreEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomScoreParser)
  }

  public getParser(): RoomScoreParser {
    return this.parser as RoomScoreParser
  }
}
