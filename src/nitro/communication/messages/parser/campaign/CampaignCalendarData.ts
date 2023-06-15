import { IMessageDataWrapper } from '@/api'

export class CampaignCalendarData {
  private _campaignName: string

  public get campaignName(): string {
    return this._campaignName
  }

  public set campaignName(name: string) {
    this._campaignName = name
  }

  private _campaignImage: string

  public get campaignImage(): string {
    return this._campaignImage
  }

  public set campaignImage(image: string) {
    this._campaignImage = image
  }

  private _currentDay: number

  public get currentDay(): number {
    return this._currentDay
  }

  public set currentDay(day: number) {
    this._currentDay = day
  }

  private _campaignDays: number

  public get campaignDays(): number {
    return this._campaignDays
  }

  public set campaignDays(days: number) {
    this._campaignDays = days
  }

  private _openedDays: number[]

  public get openedDays(): number[] {
    return this._openedDays
  }

  public set openedDays(days: number[]) {
    this._openedDays = days
  }

  private _missedDays: number[]

  public get missedDays(): number[] {
    return this._missedDays
  }

  public set missedDays(days: number[]) {
    this._missedDays = days
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._campaignName = wrapper.readString()
    this._campaignImage = wrapper.readString()
    this._currentDay = wrapper.readInt()
    this._campaignDays = wrapper.readInt()
    this._openedDays = []

    let count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._openedDays.push(wrapper.readInt())
    }

    this._missedDays = []

    count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._missedDays.push(wrapper.readInt())
    }

    return true
  }

  public clone(): CampaignCalendarData {
    const data = new CampaignCalendarData()

    data.campaignDays = this._campaignDays
    data.campaignImage = this._campaignImage
    data.campaignName = this._campaignName
    data.currentDay = this._currentDay
    data.missedDays = this._missedDays
    data.openedDays = this._openedDays

    return data
  }
}
