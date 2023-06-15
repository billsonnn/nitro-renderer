import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { IssuePickFailedMessageParser } from '@/nitro'

export class IssuePickFailedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, IssuePickFailedMessageParser)
  }

  public getParser(): IssuePickFailedMessageParser {
    return this.parser as IssuePickFailedMessageParser
  }
}
