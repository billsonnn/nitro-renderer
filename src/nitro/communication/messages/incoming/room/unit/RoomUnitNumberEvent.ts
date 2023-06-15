import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomUnitNumberParser } from '@/nitro'

export class RoomUnitNumberEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomUnitNumberParser)
  }

  public getParser(): RoomUnitNumberParser {
    return this.parser as RoomUnitNumberParser
  }
}
