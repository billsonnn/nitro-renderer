export class RoomEntryData {
  constructor(roomId: number, roomName: string, hasControllers: boolean) {
    this._roomId = roomId
    this._roomName = roomName
    this._hasControllers = hasControllers
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _roomName: string

  public get roomName(): string {
    return this._roomName
  }

  private _hasControllers: boolean = false

  public get hasControllers(): boolean {
    return this._hasControllers
  }
}
