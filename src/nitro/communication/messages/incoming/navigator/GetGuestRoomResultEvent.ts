import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GetGuestRoomResultMessageParser } from '@/nitro'

export class GetGuestRoomResultEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GetGuestRoomResultMessageParser)
  }

  public getParser(): GetGuestRoomResultMessageParser {
    return this.parser as GetGuestRoomResultMessageParser
  }
}
