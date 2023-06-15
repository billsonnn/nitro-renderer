import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { NavigatorCollapsedParser } from '@/nitro'

export class NavigatorCollapsedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, NavigatorCollapsedParser)
  }

  public getParser(): NavigatorCollapsedParser {
    return this.parser as NavigatorCollapsedParser
  }
}
