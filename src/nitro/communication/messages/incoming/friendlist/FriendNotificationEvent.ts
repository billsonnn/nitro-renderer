import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FriendNotificationParser } from '@/nitro'

export class FriendNotificationEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FriendNotificationParser)
  }

  public getParser(): FriendNotificationParser {
    return this.parser as FriendNotificationParser
  }
}
