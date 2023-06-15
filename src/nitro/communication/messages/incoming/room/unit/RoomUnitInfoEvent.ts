import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomUnitInfoParser } from '@/nitro'

export class RoomUnitInfoEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomUnitInfoParser)
  }

  public getParser(): RoomUnitInfoParser {
    return this.parser as RoomUnitInfoParser
  }
}
