import { IObjectData, ISelectedRoomObjectData, IVector3D, Vector3d } from '@/api'

export class SelectedRoomObjectData implements ISelectedRoomObjectData {
  constructor(id: number, category: number, operation: string, location: IVector3D, direction: IVector3D, typeId: number = 0, instanceData: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null) {
    this._id = id
    this._category = category
    this._operation = operation
    this._loc = new Vector3d()
    this._loc.assign(location)
    this._dir = new Vector3d()
    this._dir.assign(direction)
    this._typeId = typeId
    this._instanceData = instanceData
    this._stuffData = stuffData
    this._state = state
    this._animFrame = frameNumber
    this._posture = posture
  }

  private _id: number = 0

  public get id(): number {
    return this._id
  }

  private _category: number = 0

  public get category(): number {
    return this._category
  }

  private _operation: string = ''

  public get operation(): string {
    return this._operation
  }

  private _loc: Vector3d = null

  public get loc(): Vector3d {
    return this._loc
  }

  private _dir: Vector3d = null

  public get dir(): Vector3d {
    return this._dir
  }

  private _typeId: number = 0

  public get typeId(): number {
    return this._typeId
  }

  private _instanceData: string = null

  public get instanceData(): string {
    return this._instanceData
  }

  private _stuffData: IObjectData = null

  public get stuffData(): IObjectData {
    return this._stuffData
  }

  private _state: number = -1

  public get state(): number {
    return this._state
  }

  private _animFrame: number = -1

  public get animFrame(): number {
    return this._animFrame
  }

  private _posture: string = null

  public get posture(): string {
    return this._posture
  }

  public dispose(): void {
    this._loc = null
    this._dir = null
  }
}
