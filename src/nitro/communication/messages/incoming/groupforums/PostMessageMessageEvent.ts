import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { PostMessageMessageParser } from '@/nitro'

export class PostMessageMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, PostMessageMessageParser)
  }

  public getParser(): PostMessageMessageParser {
    return this.parser as PostMessageMessageParser
  }
}
