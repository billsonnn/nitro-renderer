import { IVector3D } from '@/api'

export class ObjectRolling {
  public static MOVE: string = 'mv'
  public static SLIDE: string = 'sld'

  constructor(id: number, location: IVector3D, targetLocation: IVector3D, movementType: string = null) {
    this._id = id
    this._location = location
    this._targetLocation = targetLocation
    this._movementType = movementType
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _location: IVector3D

  public get location(): IVector3D {
    return this._location
  }

  private _targetLocation: IVector3D

  public get targetLocation(): IVector3D {
    return this._targetLocation
  }

  private _movementType: string

  public get movementType(): string {
    return this._movementType
  }
}
