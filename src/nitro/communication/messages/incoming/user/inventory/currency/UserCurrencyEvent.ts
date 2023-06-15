import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UserCurrencyParser } from '@/nitro'

export class UserCurrencyEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UserCurrencyParser)
  }

  public getParser(): UserCurrencyParser {
    return this.parser as UserCurrencyParser
  }
}
