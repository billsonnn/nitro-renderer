import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { WeeklyGameRewardParser } from '@/nitro'

export class WeeklyGameRewardEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, WeeklyGameRewardParser)
  }

  public getParser(): WeeklyGameRewardParser {
    return this.parser as WeeklyGameRewardParser
  }
}
