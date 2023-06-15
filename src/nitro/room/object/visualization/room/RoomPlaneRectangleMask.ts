export class RoomPlaneRectangleMask {
  constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number) {
    this._leftSideLoc = k
    this._rightSideLoc = _arg_2
    this._leftSideLength = _arg_3
    this._rightSideLength = _arg_4
  }

  private _leftSideLoc: number

  public get leftSideLoc(): number {
    return this._leftSideLoc
  }

  private _rightSideLoc: number

  public get rightSideLoc(): number {
    return this._rightSideLoc
  }

  private _leftSideLength: number

  public get leftSideLength(): number {
    return this._leftSideLength
  }

  private _rightSideLength: number

  public get rightSideLength(): number {
    return this._rightSideLength
  }
}
