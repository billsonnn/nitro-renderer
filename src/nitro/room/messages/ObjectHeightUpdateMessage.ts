import { IVector3D } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'

export class ObjectHeightUpdateMessage extends RoomObjectUpdateMessage {
  constructor(location: IVector3D, direction: IVector3D, height: number) {
    super(location, direction)

    this._height = height
  }

  private _height: number

  public get height(): number {
    return this._height
  }
}
