import { Resource, Texture } from '@pixi/core'

export class PlaneTextureBitmap {
  public static MIN_NORMAL_COORDINATE_VALUE: number = -1
  public static MAX_NORMAL_COORDINATE_VALUE: number = 1

  constructor(bitmap: Texture<Resource>, normalMinX: number = -1, normalMaxX: number = 1, normalMinY: number = -1, normalMaxY: number = 1, assetName: string = null) {
    this._bitmap = bitmap
    this._normalMinX = normalMinX
    this._normalMaxX = normalMaxX
    this._normalMinY = normalMinY
    this._normalMaxY = normalMaxY
    this._assetName = assetName
  }

  private _bitmap: Texture<Resource>

  public get bitmap(): Texture<Resource> {
    return this._bitmap
  }

  private _normalMinX: number

  public get normalMinX(): number {
    return this._normalMinX
  }

  private _normalMaxX: number

  public get normalMaxX(): number {
    return this._normalMaxX
  }

  private _normalMinY: number

  public get normalMinY(): number {
    return this._normalMinY
  }

  private _normalMaxY: number

  public get normalMaxY(): number {
    return this._normalMaxY
  }

  private _assetName: string

  public get assetName(): string {
    return this._assetName
  }

  public dispose(): void {
    this._bitmap = null
  }
}
