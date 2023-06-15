import { IVector3D } from '@/api'

export class RoomObjectUpdateMessage {
  constructor(location: IVector3D, direction: IVector3D) {
    this._location = location
    this._direction = direction
  }

  private _location: IVector3D

  public get location(): IVector3D {
    return this._location
  }

  private _direction: IVector3D

  public get direction(): IVector3D {
    return this._direction
  }
}
