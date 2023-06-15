import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { TryVerificationCodeResultParser } from '@/nitro'

export class TryVerificationCodeResultMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, TryVerificationCodeResultParser)
  }

  public getParser(): TryVerificationCodeResultParser {
    return this.parser as TryVerificationCodeResultParser
  }
}
