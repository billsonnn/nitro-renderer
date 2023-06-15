export class RoomPlaneBitmapMask {
  constructor(maskType: string, leftSideLoc: number, rightSideLoc: number) {
    this._type = maskType
    this._leftSideLoc = leftSideLoc
    this._rightSideLoc = rightSideLoc
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  private _leftSideLoc: number

  public get leftSideLoc(): number {
    return this._leftSideLoc
  }

  private _rightSideLoc: number

  public get rightSideLoc(): number {
    return this._rightSideLoc
  }
}
