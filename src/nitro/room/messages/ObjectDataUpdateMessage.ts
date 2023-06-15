import { IObjectData } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'

export class ObjectDataUpdateMessage extends RoomObjectUpdateMessage {
  constructor(state: number, data: IObjectData, extra: number = null) {
    super(null, null)

    this._state = state
    this._data = data
    this._extra = extra
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _data: IObjectData

  public get data(): IObjectData {
    return this._data
  }

  private _extra: number

  public get extra(): number {
    return this._extra
  }
}
