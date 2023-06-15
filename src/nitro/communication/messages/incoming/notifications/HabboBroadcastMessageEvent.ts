import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { HabboBroadcastMessageParser } from '@/nitro'

export class HabboBroadcastMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, HabboBroadcastMessageParser)
  }

  public getParser(): HabboBroadcastMessageParser {
    return this.parser as HabboBroadcastMessageParser
  }
}
