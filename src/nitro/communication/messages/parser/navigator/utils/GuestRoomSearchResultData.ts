import { IMessageDataWrapper } from '@/api'
import { RoomDataParser } from '@/nitro'
import { OfficialRoomEntryData } from '@/nitro'

export class GuestRoomSearchResultData {
  constructor(k: IMessageDataWrapper) {
    this._rooms = []
    this._searchType = k.readInt()
    this._searchParam = k.readString()
    const count = k.readInt()
    for (let i = 0; i < count; i++) {
      this._rooms.push(new RoomDataParser(k))
    }
    const hasAdditional = k.readBoolean()
    if (hasAdditional) {
      this._ad = new OfficialRoomEntryData(k)
    }
  }

  private _searchType: number

  public get searchType(): number {
    return this._searchType
  }

  private _searchParam: string

  public get searchParam(): string {
    return this._searchParam
  }

  private _rooms: RoomDataParser[]

  public get rooms(): RoomDataParser[] {
    return this._rooms
  }

  private _ad: OfficialRoomEntryData

  public get ad(): OfficialRoomEntryData {
    return this._ad
  }

  private _disposed: boolean

  public get disposed(): boolean {
    return this._disposed
  }

  public dispose(): void {
    if (this._disposed) {
      return
    }
    this._disposed = true
    if (this._rooms != null) {
      for (const k of this._rooms) {
        k.flush()
      }
    }
    if (this._ad != null) {
      this._ad.dispose()
      this._ad = null
    }
    this._rooms = null
  }
}
