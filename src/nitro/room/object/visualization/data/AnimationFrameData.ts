export class AnimationFrameData {
  constructor(id: number, x: number, y: number, randomX: number, randomY: number, repeats: number) {
    this._id = id
    this._x = x
    this._y = y
    this._randomX = randomX
    this._randomY = randomY
    this._repeats = repeats
  }

  private _id: number = 0

  public get id(): number {
    return this._id
  }

  private _x: number = 0

  public get x(): number {
    return this._x
  }

  private _y: number = 0

  public get y(): number {
    return this._x
  }

  private _randomX: number = 0

  public get randomX(): number {
    return this._randomX
  }

  private _randomY: number = 0

  public get randomY(): number {
    return this._randomY
  }

  private _repeats: number = 1

  public get repeats(): number {
    return this._repeats
  }

  public hasDirectionalOffsets(): boolean {
    return false
  }

  public getX(k: number): number {
    return this._x
  }

  public getY(k: number): number {
    return this._y
  }
}
