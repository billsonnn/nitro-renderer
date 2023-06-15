import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { SeasonalCalendarDailyOfferMessageParser } from '@/nitro'

export class SeasonalCalendarDailyOfferMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, SeasonalCalendarDailyOfferMessageParser)
  }

  public getParser(): SeasonalCalendarDailyOfferMessageParser {
    return this.parser as SeasonalCalendarDailyOfferMessageParser
  }
}
