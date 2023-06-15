import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { IsBadgeRequestFulfilledParser } from '@/nitro'

export class IsBadgeRequestFulfilledEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, IsBadgeRequestFulfilledParser)
  }

  public getParser(): IsBadgeRequestFulfilledParser {
    return this.parser as IsBadgeRequestFulfilledParser
  }
}
