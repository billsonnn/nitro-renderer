import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CallForHelpReplyMessageParser } from '@/nitro'

export class CallForHelpReplyMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CallForHelpReplyMessageParser)
  }

  public getParser(): CallForHelpReplyMessageParser {
    return this.parser as CallForHelpReplyMessageParser
  }
}
