import { Point } from '@pixi/math'
import { IPlaneDrawingData } from '@/api'

export class PlaneDrawingData implements IPlaneDrawingData {
  private _points: Point[]
  private _alignBottom: boolean
  private _assetNames: string[][]

  constructor(k: PlaneDrawingData = null, _arg_2: number = 0, _arg_3: boolean = false) {
    this._assetNames = []
    this._maskAssetNames = []
    this._maskAssetLocations = []
    this._maskAssetFlipHs = []
    this._maskAssetFlipVs = []

    if (k != null) {
      this._maskAssetNames = k._maskAssetNames
      this._maskAssetLocations = k._maskAssetLocations
      this._maskAssetFlipHs = k._maskAssetFlipHs
      this._maskAssetFlipVs = k._maskAssetFlipVs
    }

    this._color = _arg_2
    this._alignBottom = _arg_3
  }

  private _z: number

  public get z(): number {
    return this._z
  }

  public set z(k: number) {
    this._z = k
  }

  private _color: number

  public get color(): number {
    return this._color
  }

  private _maskAssetNames: string[]

  public get maskAssetNames(): string[] {
    return this._maskAssetNames
  }

  private _maskAssetLocations: Point[]

  public get maskAssetLocations(): Point[] {
    return this._maskAssetLocations
  }

  private _maskAssetFlipHs: boolean[]

  public get maskAssetFlipHs(): boolean[] {
    return this._maskAssetFlipHs
  }

  private _maskAssetFlipVs: boolean[]

  public get maskAssetFlipVs(): boolean[] {
    return this._maskAssetFlipVs
  }

  public get cornerPoints(): Point[] {
    return this._points
  }

  public set cornerPoints(k: Point[]) {
    this._points = k
  }

  public get assetNameColumns(): string[][] {
    return this._assetNames
  }

  public addMask(k: string, _arg_2: Point, _arg_3: boolean, _arg_4: boolean): void {
    this._maskAssetNames.push(k)
    this._maskAssetLocations.push(_arg_2)
    this._maskAssetFlipHs.push(_arg_3)
    this._maskAssetFlipVs.push(_arg_4)
  }

  public addAssetColumn(k: string[]): void {
    this._assetNames.push(k)
  }

  public isBottomAligned(): boolean {
    return this._alignBottom
  }
}
