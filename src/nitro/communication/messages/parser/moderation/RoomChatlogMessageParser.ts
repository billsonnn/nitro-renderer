import { IMessageDataWrapper, IMessageParser } from '@/api'
import { ChatRecordData } from '@/nitro'

export class RoomChatlogMessageParser implements IMessageParser {
  private _data: ChatRecordData

  public get data(): ChatRecordData {
    return this._data
  }

  public flush(): boolean {
    this._data = null
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._data = new ChatRecordData(wrapper)

    return true
  }
}
