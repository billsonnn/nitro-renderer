import { Resource, Texture } from '@pixi/core'
import { Rectangle } from '@pixi/math'
import { Sprite } from '@pixi/sprite'
import { TextureUtils } from '@/pixi-proxy'
import { IGraphicAsset } from '@/api'

export class GraphicAsset implements IGraphicAsset {
  private static GRAPHIC_POOL: GraphicAsset[] = []
  private _initialized: boolean

  private _name: string

  public get name(): string {
    return this._name
  }

  private _source: string

  public get source(): string {
    return this._source
  }

  private _texture: Texture<Resource>

  public get texture(): Texture<Resource> {
    return this._texture
  }

  private _usesPalette: boolean

  public get usesPalette(): boolean {
    return this._usesPalette
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
    this.initialize()

    return this._width
  }

  private _height: number

  public get height(): number {
    this.initialize()

    return this._height
  }

  private _flipH: boolean

  public get flipH(): boolean {
    return this._flipH
  }

  private _flipV: boolean

  public get flipV(): boolean {
    return this._flipV
  }

  private _rectangle: Rectangle

  public get rectangle(): Rectangle {
    if (!this._rectangle) this._rectangle = new Rectangle(0, 0, this.width, this.height)

    return this._rectangle
  }

  public get offsetX(): number {
    if (!this._flipH) return this._x

    return (-(this._x))
  }

  public get offsetY(): number {
    if (!this._flipV) return this._y

    return (-(this._y))
  }

  public static createAsset(name: string, source: string, texture: Texture<Resource>, x: number, y: number, flipH: boolean = false, flipV: boolean = false, usesPalette: boolean = false): GraphicAsset {
    const graphicAsset = (GraphicAsset.GRAPHIC_POOL.length ? GraphicAsset.GRAPHIC_POOL.pop() : new GraphicAsset())

    graphicAsset._name = name
    graphicAsset._source = source || null

    if (texture) {
      graphicAsset._texture = texture
      graphicAsset._initialized = false
    } else {
      graphicAsset._texture = null
      graphicAsset._initialized = true
    }

    graphicAsset._usesPalette = usesPalette
    graphicAsset._x = x
    graphicAsset._y = y
    graphicAsset._flipH = flipH
    graphicAsset._flipV = flipV
    graphicAsset._rectangle = null

    return graphicAsset
  }

  public recycle(): void {
    this._texture = null

    GraphicAsset.GRAPHIC_POOL.push(this)
  }

  public getImageUrl(): string {
    return TextureUtils.generateImageUrl(new Sprite(this._texture))
  }

  private initialize(): void {
    if (this._initialized || !this._texture) return

    this._width = this._texture.width
    this._height = this._texture.height

    this._initialized = true
  }
}
