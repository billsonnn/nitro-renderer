import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GuideSessionRequesterRoomMessageParser } from '@/nitro'

export class GuideSessionRequesterRoomMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GuideSessionRequesterRoomMessageParser)
  }

  public getParser(): GuideSessionRequesterRoomMessageParser {
    return this.parser as GuideSessionRequesterRoomMessageParser
  }
}
