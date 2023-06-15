import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FlatControllerData } from '@/nitro'

export class FlatControllerAddedParser implements IMessageParser {
  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _data: FlatControllerData

  public get data(): FlatControllerData {
    return this._data
  }

  public flush(): boolean {
    this._roomId = 0
    this._data = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._data = new FlatControllerData(wrapper)

    return true
  }
}
