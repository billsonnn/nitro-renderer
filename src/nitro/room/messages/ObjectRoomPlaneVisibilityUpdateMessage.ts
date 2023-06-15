import { RoomObjectUpdateMessage } from '@/room'

export class ObjectRoomPlaneVisibilityUpdateMessage extends RoomObjectUpdateMessage {
  public static WALL_VISIBILITY: string = 'RORPVUM_WALL_VISIBILITY'
  public static FLOOR_VISIBILITY: string = 'RORPVUM_FLOOR_VISIBILITY'

  constructor(type: string, visible: boolean) {
    super(null, null)

    this._type = type
    this._visible = visible
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _visible: boolean

  public get visible(): boolean {
    return this._visible
  }
}
