export class RoomPlaneMaskData {
  constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number) {
    this._leftSideLoc = k
    this._rightSideLoc = _arg_2
    this._leftSideLength = _arg_3
    this._rightSideLength = _arg_4
  }

  private _leftSideLoc: number = 0

  public get leftSideLoc(): number {
    return this._leftSideLoc
  }

  private _rightSideLoc: number = 0

  public get rightSideLoc(): number {
    return this._rightSideLoc
  }

  private _leftSideLength: number = 0

  public get leftSideLength(): number {
    return this._leftSideLength
  }

  private _rightSideLength: number = 0

  public get rightSideLength(): number {
    return this._rightSideLength
  }
}
