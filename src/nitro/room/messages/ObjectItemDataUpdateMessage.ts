import { RoomObjectUpdateMessage } from '@/room'

export class ObjectItemDataUpdateMessage extends RoomObjectUpdateMessage {
  constructor(data: string) {
    super(null, null)

    this._data = data
  }

  private _data: string

  public get data(): string {
    return this._data
  }
}
