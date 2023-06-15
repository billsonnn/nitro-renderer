import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomEnterParser } from '@/nitro'

export class RoomEnterEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomEnterParser)
  }

  public getParser(): RoomEnterParser {
    return this.parser as RoomEnterParser
  }
}
