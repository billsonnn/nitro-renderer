import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { FlatControllersParser } from '@/nitro'

export class FlatControllersEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, FlatControllersParser)
  }

  public getParser(): FlatControllersParser {
    return this.parser as FlatControllersParser
  }
}
