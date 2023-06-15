import { RoomObjectUpdateMessage } from '@/room'

export class ObjectRoomFloorHoleUpdateMessage extends RoomObjectUpdateMessage {
  public static ADD: string = 'ORPFHUM_ADD'
  public static REMOVE: string = 'ORPFHUM_REMOVE'

  constructor(type: string, id: number, x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    super(null, null)

    this._type = type
    this._id = id
    this._x = x
    this._y = y
    this._width = width
    this._height = height
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _x: number

  public get x(): number {
    return this._x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  private _width: number

  public get width(): number {
    return this._width
  }

  private _height: number

  public get height(): number {
    return this._height
  }
}
