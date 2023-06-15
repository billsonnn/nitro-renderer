import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CheckUserNameResultMessageParser } from '@/nitro'

export class CheckUserNameResultMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CheckUserNameResultMessageParser)
  }

  public getParser(): CheckUserNameResultMessageParser {
    return this.parser as CheckUserNameResultMessageParser
  }
}
