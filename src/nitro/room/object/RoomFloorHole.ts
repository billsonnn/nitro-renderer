export class RoomFloorHole {
  constructor(x: number, y: number, width: number, height: number) {
    this._x = x
    this._y = y
    this._width = width
    this._height = height
  }

  private _x: number

  public get x(): number {
    return this._x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  private _width: number

  public get width(): number {
    return this._width
  }

  private _height: number

  public get height(): number {
    return this._height
  }
}
