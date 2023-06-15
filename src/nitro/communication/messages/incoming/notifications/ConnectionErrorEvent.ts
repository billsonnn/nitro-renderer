import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ConnectionErrorMessageParser } from '@/nitro'

export class ConnectionErrorEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ConnectionErrorMessageParser)
  }

  public getParser(): ConnectionErrorMessageParser {
    return this.parser as ConnectionErrorMessageParser
  }
}
