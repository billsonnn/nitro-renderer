import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CommunityVoteReceivedParser } from '@/nitro'

export class CommunityGoalVoteMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CommunityVoteReceivedParser)
  }

  public getParser(): CommunityVoteReceivedParser {
    return this.parser as CommunityVoteReceivedParser
  }
}
