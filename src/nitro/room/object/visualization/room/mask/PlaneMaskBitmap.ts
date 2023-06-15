import { IGraphicAsset } from '@/api'

export class PlaneMaskBitmap {
  public static MIN_NORMAL_COORDINATE_VALUE: number = -1
  public static MAX_NORMAL_COORDINATE_VALUE: number = 1

  constructor(k: IGraphicAsset, _arg_2: number = -1, _arg_3: number = 1, _arg_4: number = -1, _arg_5: number = 1) {
    this._normalMinX = _arg_2
    this._normalMaxX = _arg_3
    this._normalMinY = _arg_4
    this._normalMaxY = _arg_5
    this._asset = k
  }

  private _asset: IGraphicAsset

  public get asset(): IGraphicAsset {
    return this._asset
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

  public dispose(): void {
    this._asset = null
  }
}
