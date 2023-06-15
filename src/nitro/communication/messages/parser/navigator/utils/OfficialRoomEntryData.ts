import { IMessageDataWrapper } from '@/api'
import { RoomDataParser } from '@/nitro'

export class OfficialRoomEntryData {
  public static readonly TYPE_TAG = 1
  public static readonly TYPE_GUEST_ROOM = 2
  public static readonly TYPE_FOLDER = 4

  constructor(k: IMessageDataWrapper) {
    this._index = k.readInt()
    this._popupCaption = k.readString()
    this._popupDesc = k.readString()
    this._showDetails = k.readInt() == 1
    this._picText = k.readString()
    this._picRef = k.readString()
    this._folderId = k.readInt()
    this._userCount = k.readInt()
    this._type = k.readInt()
    if (this._type == OfficialRoomEntryData.TYPE_TAG) {
      this._tag = k.readString()
    } else {
      if (this._type == OfficialRoomEntryData.TYPE_GUEST_ROOM) {
        this._guestRoomData = new RoomDataParser(k)
      } else {
        this._open = k.readBoolean()
      }
    }
  }

  private _index: number

  public get index(): number {
    return this._index
  }

  private _popupCaption: string

  public get popupCaption(): string {
    return this._popupCaption
  }

  private _popupDesc: string

  public get popupDesc(): string {
    return this._popupDesc
  }

  private _showDetails: boolean

  public get showDetails(): boolean {
    return this._showDetails
  }

  private _picText: string

  public get picText(): string {
    return this._picText
  }

  private _picRef: string

  public get picRef(): string {
    return this._picRef
  }

  private _folderId: number

  public get folderId(): number {
    return this._folderId
  }

  private _userCount: number

  public get userCount(): number {
    return this._userCount
  }

  private _type: number

  public get type(): number {
    return this._type
  }

  private _tag: string

  public get tag(): string {
    return this._tag
  }

  private _guestRoomData: RoomDataParser

  public get guestRoomData(): RoomDataParser {
    return this._guestRoomData
  }

  private _open: boolean

  public get open(): boolean {
    return this._open
  }

  private _disposed: boolean

  public get disposed(): boolean {
    return this._disposed
  }

  public get maxUsers(): number {
    if (this.type == OfficialRoomEntryData.TYPE_TAG) {
      return 0
    }
    if (this.type == OfficialRoomEntryData.TYPE_GUEST_ROOM) {
      return this._guestRoomData.maxUserCount
    }
    return 0
  }

  public dispose(): void {
    if (this._disposed) {
      return
    }
    this._disposed = true
    if (this._guestRoomData != null) {
      this._guestRoomData.flush()
      this._guestRoomData = null
    }
  }

  public toggleOpen(): void {
    this._open = !this._open
  }
}
