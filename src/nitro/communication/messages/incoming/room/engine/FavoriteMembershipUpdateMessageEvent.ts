import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FavoriteMembershipUpdateMessageParser } from '@/nitro'

export class FavoriteMembershipUpdateMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FavoriteMembershipUpdateMessageParser)
  }

  public getParser(): FavoriteMembershipUpdateMessageParser {
    return this.parser as FavoriteMembershipUpdateMessageParser
  }
}
