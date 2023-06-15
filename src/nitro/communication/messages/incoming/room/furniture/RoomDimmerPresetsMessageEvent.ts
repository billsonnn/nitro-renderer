import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RoomDimmerPresetsMessageParser } from '@/nitro'

export class RoomDimmerPresetsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RoomDimmerPresetsMessageParser)
  }

  public getParser(): RoomDimmerPresetsMessageParser {
    return this.parser as RoomDimmerPresetsMessageParser
  }
}
