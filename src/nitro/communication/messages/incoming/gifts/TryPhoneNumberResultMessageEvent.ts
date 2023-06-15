import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TryPhoneNumberResultParser } from '@/nitro'

export class TryPhoneNumberResultMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TryPhoneNumberResultParser)
  }

  public getParser(): TryPhoneNumberResultParser {
    return this.parser as TryPhoneNumberResultParser
  }
}
