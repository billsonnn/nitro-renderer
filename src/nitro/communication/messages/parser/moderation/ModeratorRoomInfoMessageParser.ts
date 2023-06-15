import { IMessageDataWrapper, IMessageParser } from '@/api'
import { RoomModerationData } from '@/nitro'

export class ModeratorRoomInfoMessageParser implements IMessageParser {
  private _data: RoomModerationData

  public get data(): RoomModerationData {
    return this._data
  }

  public flush(): boolean {
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new RoomModerationData(wrapper)

    return true
  }
}
