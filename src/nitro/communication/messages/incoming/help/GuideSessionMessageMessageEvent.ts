import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GuideSessionMessageMessageParser } from '@/nitro'

export class GuideSessionMessageMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GuideSessionMessageMessageParser)
  }

  public getParser(): GuideSessionMessageMessageParser {
    return this.parser as GuideSessionMessageMessageParser
  }
}
