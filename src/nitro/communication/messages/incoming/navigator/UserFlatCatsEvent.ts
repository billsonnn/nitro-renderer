import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UserFlatCatsMessageParser } from '@/nitro'

export class UserFlatCatsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UserFlatCatsMessageParser)
  }

  public getParser(): UserFlatCatsMessageParser {
    return this.parser as UserFlatCatsMessageParser
  }
}
