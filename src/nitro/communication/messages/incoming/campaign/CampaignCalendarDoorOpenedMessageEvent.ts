import { IMessageEvent } from '@/api'
import { MessageEvent } from '@/events'
import { CampaignCalendarDoorOpenedMessageParser } from '@/nitro'

export class CampaignCalendarDoorOpenedMessageEvent extends MessageEvent implements IMessageEvent {
  constructor(callBack: Function) {
    super(callBack, CampaignCalendarDoorOpenedMessageParser)
  }

  public getParser(): CampaignCalendarDoorOpenedMessageParser {
    return this.parser as CampaignCalendarDoorOpenedMessageParser
  }
}
