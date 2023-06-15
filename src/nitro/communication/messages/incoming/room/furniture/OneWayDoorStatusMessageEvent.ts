import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { OneWayDoorStatusMessageParser } from '@/nitro'

export class OneWayDoorStatusMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, OneWayDoorStatusMessageParser)
  }

  public getParser(): OneWayDoorStatusMessageParser {
    return this.parser as OneWayDoorStatusMessageParser
  }
}
