import { IMessageDataWrapper, IMessageParser } from '@/api'
import { CatalogPageMessageOfferData } from '@/nitro'

export class SeasonalCalendarDailyOfferMessageParser implements IMessageParser {
  private _pageId: number

  public get pageId(): number {
    return this._pageId
  }

  private _data: CatalogPageMessageOfferData

  public get data(): CatalogPageMessageOfferData {
    return this._data
  }

  public flush(): boolean {
    this._pageId = -1
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._pageId = wrapper.readInt()
    this._data = new CatalogPageMessageOfferData(wrapper)

    return true
  }
}
