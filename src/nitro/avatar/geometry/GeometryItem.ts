import { Node3D, Vector3D } from '@/nitro'

export class GeometryItem extends Node3D {
  private _radius: number

  constructor(k: any, _arg_2: boolean = false) {
    super(parseFloat(k.x), parseFloat(k.y), parseFloat(k.z))

    this._id = k.id
    this._radius = parseFloat(k.radius)
    this._normal = new Vector3D(parseFloat(k.nx), parseFloat(k.ny), parseFloat(k.nz))
    this._isDoubleSided = k.double || false
    this._isDynamic = _arg_2
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _normal: Vector3D

  public get normal(): Vector3D {
    return this._normal
  }

  private _isDoubleSided: boolean

  public get isDoubleSided(): boolean {
    return this._isDoubleSided
  }

  private _isDynamic: boolean

  public get isDynamic(): boolean {
    return this._isDynamic
  }

  public getDistance(k: Vector3D): number {
    const _local_2 = Math.abs(((k.z - this.transformedLocation.z) - this._radius))
    const _local_3 = Math.abs(((k.z - this.transformedLocation.z) + this._radius))

    return Math.min(_local_2, _local_3)
  }

  public toString(): string {
    return ((((this._id + ': ') + this.location) + ' - ') + this.transformedLocation)
  }
}
