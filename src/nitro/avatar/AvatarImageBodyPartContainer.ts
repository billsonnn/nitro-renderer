import { Container } from '@pixi/display'
import { Point } from '@pixi/math'

export class AvatarImageBodyPartContainer {
  constructor(k: Container, _arg_2: Point, _arg_3: boolean) {
    this._image = k
    this._regPoint = _arg_2
    this._offset = new Point(0, 0)
    this._regPoint = _arg_2
    this._isCacheable = _arg_3

    this.cleanPoints()
  }

  private _image: Container

  public get image(): Container {
    return this._image
  }

  public set image(k: Container) {
    if (this._image && (this._image !== k)) {
      this._image.destroy({
        children: true
      })
    }

    this._image = k
  }

  private _regPoint: Point

  public get regPoint(): Point {
    const clone = this._regPoint.clone()

    clone.x += this._offset.x
    clone.y += this._offset.y

    return clone
  }

  private _offset: Point

  public set offset(k: Point) {
    this._offset = k

    this.cleanPoints()
  }

  private _isCacheable: boolean

  public get isCacheable(): boolean {
    return this._isCacheable
  }

  public dispose(): void {
    if (this._image) {
      this._image.destroy({
        children: true
      })
    }

    this._image = null
    this._regPoint = null
    this._offset = null
  }

  public setRegPoint(k: Point): void {
    this._regPoint = k

    this.cleanPoints()
  }

  private cleanPoints(): void {
    // this._regPoint.x    = this._regPoint.x;
    // this._regPoint.y    = this._regPoint.y;
    // this._offset.x      = this._offset.x;
    // this._offset.y      = this._offset.y;
  }
}
