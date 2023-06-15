import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PopularRoomTagsData } from '@/nitro'

export class PopularRoomTagsResultMessageParser implements IMessageParser {
  private _data: PopularRoomTagsData

  public get data(): PopularRoomTagsData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new PopularRoomTagsData(wrapper)

    return true
  }
}
