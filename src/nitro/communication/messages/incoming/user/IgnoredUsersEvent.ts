import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { IgnoredUsersParser } from '@/nitro'

export class IgnoredUsersEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, IgnoredUsersParser)
  }

  public getParser(): IgnoredUsersParser {
    return this.parser as IgnoredUsersParser
  }
}
