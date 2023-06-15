import { Point } from '@pixi/math'
import { AvatarScaleType } from '@/api'

export class AvatarCanvas {
  constructor(k: any, _arg_2: string) {
    this._id = k.id
    this._width = k.width
    this._height = k.height
    this._offset = new Point(k.dx, k.dy)

    if (_arg_2 == AvatarScaleType.LARGE) this._regPoint = new Point(((this._width - 64) / 2), 0)
    else this._regPoint = new Point(((this._width - 32) / 2), 0)
  }

  private _id: string

  public get id(): string {
    return this._id
  }

  private _width: number

  public get width(): number {
    return this._width
  }

  private _height: number

  public get height(): number {
    return this._height
  }

  private _offset: Point

  public get offset(): Point {
    return this._offset
  }

  private _regPoint: Point

  public get regPoint(): Point {
    return this._regPoint
  }
}
