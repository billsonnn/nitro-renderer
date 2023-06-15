import { RoomObjectUpdateMessage } from '@/room'

export class ObjectRoomUpdateMessage extends RoomObjectUpdateMessage {
  public static ROOM_WALL_UPDATE: string = 'RORUM_ROOM_WALL_UPDATE'
  public static ROOM_FLOOR_UPDATE: string = 'RORUM_ROOM_FLOOR_UPDATE'
  public static ROOM_LANDSCAPE_UPDATE: string = 'RORUM_ROOM_LANDSCAPE_UPDATE'

  constructor(type: string, value: string) {
    super(null, null)

    this._type = type
    this._value = value
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _value: string

  public get value(): string {
    return this._value
  }
}
