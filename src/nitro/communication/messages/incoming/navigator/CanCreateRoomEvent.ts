import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CanCreateRoomMessageParser } from '@/nitro'

export class CanCreateRoomEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CanCreateRoomMessageParser)
  }

  public getParser(): CanCreateRoomMessageParser {
    return this.parser as CanCreateRoomMessageParser
  }
}
