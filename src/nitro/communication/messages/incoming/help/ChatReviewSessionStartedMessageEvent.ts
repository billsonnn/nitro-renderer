import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { ChatReviewSessionStartedMessageParser } from '@/nitro'

export class ChatReviewSessionStartedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, ChatReviewSessionStartedMessageParser)
  }

  public getParser(): ChatReviewSessionStartedMessageParser {
    return this.parser as ChatReviewSessionStartedMessageParser
  }
}
