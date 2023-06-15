import { IMessageDataWrapper } from '@/api'

export class RoomVisitData {
  constructor(k: IMessageDataWrapper) {
    this._roomId = k.readInt()
    this._roomName = k.readString()
    this._enterHour = k.readInt()
    this._enterMinute = k.readInt()
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  private _enterHour: number

  public get enterHour(): number {
    return this._enterHour
  }

  private _enterMinute: number

  public get enterMinute(): number {
    return this._enterMinute
  }
}
