import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UserWardrobePageParser } from '@/nitro'

export class UserWardrobePageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UserWardrobePageParser)
  }

  public getParser(): UserWardrobePageParser {
    return this.parser as UserWardrobePageParser
  }
}
