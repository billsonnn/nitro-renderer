import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomEventData } from './utils'

export class RoomEventMessageParser implements IMessageParser {
  private _data: RoomEventData

  public get data(): RoomEventData {
    return this._data
  }

  flush(): boolean {
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._data = new RoomEventData(wrapper)
    return true
  }
}
