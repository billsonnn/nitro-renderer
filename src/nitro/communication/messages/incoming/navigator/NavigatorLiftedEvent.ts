import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { NavigatorLiftedParser } from '@/nitro'

export class NavigatorLiftedEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, NavigatorLiftedParser)
  }

  public getParser(): NavigatorLiftedParser {
    return this.parser as NavigatorLiftedParser
  }
}
