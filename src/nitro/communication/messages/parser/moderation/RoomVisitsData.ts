import { IMessageDataWrapper } from '@/api'
import { RoomVisitData } from '@/nitro'

export class RoomVisitsData {
  constructor(k: IMessageDataWrapper) {
    this._rooms = []
    this._userId = k.readInt()
    this._userName = k.readString()
    const _local_2 = k.readInt()
    let _local_3 = 0
    while (_local_3 < _local_2) {
      this._rooms.push(new RoomVisitData(k))
      _local_3++
    }
  }

  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _userName: string

  public get userName(): string {
    return this._userName
  }

  private _rooms: RoomVisitData[]

  public get rooms(): RoomVisitData[] {
    return this._rooms
  }
}
