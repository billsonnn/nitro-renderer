import { IVector3D, Vector3d } from '@/api'
import { RoomObjectUpdateMessage } from '@/room'

export class ObjectRoomMaskUpdateMessage extends RoomObjectUpdateMessage {
  public static ADD_MASK: string = 'RORMUM_ADD_MASK'
  public static REMOVE_MASK: string = 'RORMUM_ADD_MASK'
  public static DOOR: string = 'door'
  public static WINDOW: string = 'window'
  public static HOLE: string = 'hole'

  constructor(type: string, maskId: string, maskType: string = null, maskLocation: IVector3D = null, maskCategory: string = 'window') {
    super(null, null)

    this._type = type
    this._maskId = maskId
    this._maskType = maskType
    this._maskLocation = maskLocation ? new Vector3d(maskLocation.x, maskLocation.y, maskLocation.z) : null
    this._maskCategory = maskCategory
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _maskId: string

  public get maskId(): string {
    return this._maskId
  }

  private _maskType: string

  public get maskType(): string {
    return this._maskType
  }

  private _maskLocation: Vector3d

  public get maskLocation(): IVector3D {
    return this._maskLocation
  }

  private _maskCategory: string

  public get maskCategory(): string {
    return this._maskCategory
  }
}
