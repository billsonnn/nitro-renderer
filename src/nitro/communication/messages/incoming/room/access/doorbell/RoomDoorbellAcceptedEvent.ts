import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomDoorbellAcceptedParser } from '@/nitro'

export class RoomDoorbellAcceptedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomDoorbellAcceptedParser)
  }

  public getParser(): RoomDoorbellAcceptedParser {
    return this.parser as RoomDoorbellAcceptedParser
  }
}
