import { IObjectData, IVector3D, Vector3d } from '@/api'

export class RoomFurnitureData {
  constructor(id: number, typeId: number, type: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra: number = NaN, expires: number = -1, usagePolicy: number = 0, ownerId: number = 0, ownerName: string = '', synchronized: boolean = true, realRoomObject: boolean = true, sizeZ: number = -1) {
    this._id = id
    this._typeId = typeId
    this._type = type
    this._state = state
    this._data = objectData
    this._extra = extra
    this._expiryTime = expires
    this._usagePolicy = usagePolicy
    this._ownerId = ownerId
    this._ownerName = ownerName
    this._synchronized = synchronized
    this._realRoomObject = realRoomObject
    this._sizeZ = sizeZ

    this._location = new Vector3d()
    this._direction = new Vector3d()

    this._location.assign(location)
    this._direction.assign(direction)
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _typeId: number

  public get typeId(): number {
    return this._typeId
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _location: Vector3d

  public get location(): IVector3D {
    return this._location
  }

  private _direction: Vector3d

  public get direction(): IVector3D {
    return this._direction
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  private _data: IObjectData

  public get data(): IObjectData {
    return this._data
  }

  private _extra: number

  public get extra(): number {
    return this._extra
  }

  private _expiryTime: number

  public get expiryTime(): number {
    return this._expiryTime
  }

  private _usagePolicy: number

  public get usagePolicy(): number {
    return this._usagePolicy
  }

  private _ownerId: number

  public get ownerId(): number {
    return this._ownerId
  }

  private _ownerName: string

  public get ownerName(): string {
    return this._ownerName
  }

  private _synchronized: boolean

  public get synchronized(): boolean {
    return this._synchronized
  }

  private _realRoomObject: boolean

  public get realRoomObject(): boolean {
    return this._realRoomObject
  }

  private _sizeZ: number

  public get sizeZ(): number {
    return this._sizeZ
  }
}
