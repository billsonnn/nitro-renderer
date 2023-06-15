import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FriendRequestsParser } from '@/nitro'

export class FriendRequestsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FriendRequestsParser)
  }

  public getParser(): FriendRequestsParser {
    return this.parser as FriendRequestsParser
  }
}
