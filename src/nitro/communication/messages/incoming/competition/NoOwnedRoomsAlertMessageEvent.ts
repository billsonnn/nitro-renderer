import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { NoOwnedRoomsAlertMessageParser } from '@/nitro'

export class NoOwnedRoomsAlertMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, NoOwnedRoomsAlertMessageParser)
  }

  public getParser(): NoOwnedRoomsAlertMessageParser {
    return this.parser as NoOwnedRoomsAlertMessageParser
  }
}
