import { IVector3D } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'

export class ObjectMoveUpdateMessage extends RoomObjectUpdateMessage {
  constructor(location: IVector3D, targetLocation: IVector3D, direction: IVector3D, isSlide: boolean = false) {
    super(location, direction)

    this._targetLocation = targetLocation
    this._isSlide = isSlide
  }

  private _targetLocation: IVector3D

  public get targetLocation(): IVector3D {
    if (!this._targetLocation) return this.location

    return this._targetLocation
  }

  private _isSlide: boolean

  public get isSlide(): boolean {
    return this._isSlide
  }
}
