import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { AchievementResolutionsMessageParser } from '@/nitro'

export class AchievementResolutionsMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, AchievementResolutionsMessageParser)
  }

  public getParser(): AchievementResolutionsMessageParser {
    return this.parser as AchievementResolutionsMessageParser
  }
}
