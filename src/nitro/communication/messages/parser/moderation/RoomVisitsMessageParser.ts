import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomVisitsData } from '@/nitro'

export class RoomVisitsMessageParser implements IMessageParser {
  private _data: RoomVisitsData

  public get data(): RoomVisitsData {
    return this._data
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._data = new RoomVisitsData(wrapper)
    return true
  }
}
