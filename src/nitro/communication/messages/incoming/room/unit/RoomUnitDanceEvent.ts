import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomUnitDanceParser } from '@/nitro'

export class RoomUnitDanceEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomUnitDanceParser)
  }

  public getParser(): RoomUnitDanceParser {
    return this.parser as RoomUnitDanceParser
  }
}
