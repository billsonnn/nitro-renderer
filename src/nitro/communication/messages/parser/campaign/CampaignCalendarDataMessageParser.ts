import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CampaignCalendarData } from '@/nitro'

export class CampaignCalendarDataMessageParser implements IMessageParser {
  private _calendarData: CampaignCalendarData

  public get calendarData(): CampaignCalendarData {
    return this._calendarData
  }

  public flush(): boolean {
    this._calendarData = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._calendarData = new CampaignCalendarData()
    this._calendarData.parse(wrapper)

    return true
  }
}
