import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { UserUnbannedFromRoomParser } from '@/nitro'

export class UserUnbannedFromRoomEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, UserUnbannedFromRoomParser)
  }

  public getParser(): UserUnbannedFromRoomParser {
    return this.parser as UserUnbannedFromRoomParser
  }
}
