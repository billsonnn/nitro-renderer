import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomUnitParser } from '@/nitro'

export class RoomUnitEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomUnitParser)
  }

  public getParser(): RoomUnitParser {
    return this.parser as RoomUnitParser
  }
}
