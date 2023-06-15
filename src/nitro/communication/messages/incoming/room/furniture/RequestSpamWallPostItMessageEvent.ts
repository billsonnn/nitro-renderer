import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { RequestSpamWallPostItMessageParser } from '@/nitro'

export class RequestSpamWallPostItMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, RequestSpamWallPostItMessageParser)
  }

  public getParser(): RequestSpamWallPostItMessageParser {
    return this.parser as RequestSpamWallPostItMessageParser
  }
}
