import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ScrSendKickbackInfoMessageParser } from '@/nitro'

export class ScrSendKickbackInfoMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ScrSendKickbackInfoMessageParser)
  }

  public getParser(): ScrSendKickbackInfoMessageParser {
    return this.parser as ScrSendKickbackInfoMessageParser
  }
}
