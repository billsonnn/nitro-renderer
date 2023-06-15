import { Resource, Texture } from '@pixi/core'
import { Container } from '@pixi/display'
import { Point, Rectangle } from '@pixi/math'

export class ImageData {
  constructor(texture: Texture<Resource>, rectangle: Rectangle, _arg_3: Point, flipH: boolean, color: number, container: Container = null) {
    this._texture = texture
    this._container = container
    this._rect = rectangle
    this._regPoint = _arg_3
    this._flipH = flipH
    this._colorTransform = color

    if (flipH) this._regPoint.x = (-(this._regPoint.x) + rectangle.width)
  }

  private _texture: Texture<Resource>

  public get texture(): Texture<Resource> {
    return this._texture
  }

  private _container: Container

  public get container(): Container {
    return this._container
  }

  private _rect: Rectangle

  public get rect(): Rectangle {
    return this._rect
  }

  private _regPoint: Point

  public get regPoint(): Point {
    return this._regPoint
  }

  private _flipH: boolean

  public get flipH(): boolean {
    return this._flipH
  }

  private _colorTransform: number

  public get colorTransform(): number {
    return this._colorTransform
  }

  public get offsetRect(): Rectangle {
    return new Rectangle(-(this._regPoint.x), -(this._regPoint.y), this._rect.width, this._rect.height)
  }

  public dispose(): void {
    this._texture = null
    this._regPoint = null
    this._colorTransform = null
  }
}
