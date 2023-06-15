import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { GuildForumThreadsParser } from '@/nitro'

export class GuildForumThreadsEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, GuildForumThreadsParser)
  }

  public getParser(): GuildForumThreadsParser {
    return this.parser as GuildForumThreadsParser
  }
}
