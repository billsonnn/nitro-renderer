import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { IdentityAccountsParser } from '@/nitro'

export class IdentityAccountsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, IdentityAccountsParser)
  }

  public getParser(): IdentityAccountsParser {
    return this.parser as IdentityAccountsParser
  }
}
