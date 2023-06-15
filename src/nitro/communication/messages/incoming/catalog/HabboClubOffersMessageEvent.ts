import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { HabboClubOffersMessageParser } from '@/nitro'

export class HabboClubOffersMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, HabboClubOffersMessageParser)
  }

  public getParser(): HabboClubOffersMessageParser {
    return this.parser as HabboClubOffersMessageParser
  }
}
