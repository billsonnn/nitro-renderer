import { IDisposable, IMessageDataWrapper } from '@/api'
import { ModRoomData } from '@/nitro'

export class RoomModerationData implements IDisposable {
  constructor(k: IMessageDataWrapper) {
    this._flatId = k.readInt()
    this._userCount = k.readInt()
    this._ownerInRoom = k.readBoolean()
    this._ownerId = k.readInt()
    this._ownerName = k.readString()
    this._room = new ModRoomData(k)
  }

  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _userCount: number

  public get userCount(): number {
    return this._userCount
  }

  private _ownerInRoom: boolean

  public get ownerInRoom(): boolean {
    return this._ownerInRoom
  }

  private _ownerId: number

  public get ownerId(): number {
    return this._ownerId
  }

  private _ownerName: string

  public get ownerName(): string {
    return this._ownerName
  }

  private _room: ModRoomData

  public get room(): ModRoomData {
    return this._room
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
    if (this._room != null) {
      this._room.dispose()
      this._room = null
    }
  }
}
