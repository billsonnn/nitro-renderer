import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { AchievementResolutionProgressMessageParser } from '@/nitro'

export class AchievementResolutionProgressMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, AchievementResolutionProgressMessageParser)
  }

  public getParser(): AchievementResolutionProgressMessageParser {
    return this.parser as AchievementResolutionProgressMessageParser
  }
}
