import { RoomMapData } from '@/nitro'

export class RoomData {
  constructor(roomId: number, data: RoomMapData) {
    this._roomId = roomId
    this._data = data
    this._floorType = null
    this._wallType = null
    this._landscapeType = null
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _data: RoomMapData

  public get data(): RoomMapData {
    return this._data
  }

  private _floorType: string

  public get floorType(): string {
    return this._floorType
  }

  public set floorType(k: string) {
    this._floorType = k
  }

  private _wallType: string

  public get wallType(): string {
    return this._wallType
  }

  public set wallType(k: string) {
    this._wallType = k
  }

  private _landscapeType: string

  public get landscapeType(): string {
    return this._landscapeType
  }

  public set landscapeType(k: string) {
    this._landscapeType = k
  }
}
