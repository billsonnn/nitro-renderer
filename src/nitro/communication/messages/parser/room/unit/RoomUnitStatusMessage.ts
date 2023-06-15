import { RoomUnitStatusAction } from '@/nitro'

export class RoomUnitStatusMessage {
  constructor(id: number, x: number, y: number, z: number, height: number, headDirection: number, direction: number, targetX: number = 0, targetY: number = 0, targetZ: number = 0, didMove: boolean, canStandUp: boolean, actions: RoomUnitStatusAction[]) {
    this._id = id
    this._x = x
    this._y = y
    this._z = z
    this._height = height
    this._headDirection = headDirection
    this._direction = direction
    this._targetX = targetX
    this._targetY = targetY
    this._targetZ = targetZ
    this._didMove = didMove
    this._canStandUp = canStandUp
    this._actions = actions || []
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

  private _z: number

  public get z(): number {
    return this._z
  }

  private _height: number

  public get height(): number {
    return this._height
  }

  private _headDirection: number

  public get headDirection(): number {
    return this._headDirection
  }

  private _direction: number

  public get direction(): number {
    return this._direction
  }

  private _targetX: number

  public get targetX(): number {
    return this._targetX
  }

  private _targetY: number

  public get targetY(): number {
    return this._targetY
  }

  private _targetZ: number

  public get targetZ(): number {
    return this._targetZ
  }

  private _didMove: boolean

  public get didMove(): boolean {
    return this._didMove
  }

  private _canStandUp: boolean

  public get canStandUp(): boolean {
    return this._canStandUp
  }

  private _actions: RoomUnitStatusAction[]

  public get actions(): RoomUnitStatusAction[] {
    return this._actions
  }
}
