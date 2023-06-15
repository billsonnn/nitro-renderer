import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UnloadGameMessageParser } from '@/nitro'

export class UnloadGameMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UnloadGameMessageParser)
  }

  public getParser(): UnloadGameMessageParser {
    return this.parser as UnloadGameMessageParser
  }
}
