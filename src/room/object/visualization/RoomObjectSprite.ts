import { BLEND_MODES } from '@pixi/constants'
import { Filter, Resource, Texture } from '@pixi/core'
import { Container } from '@pixi/display'
import { AlphaTolerance, IRoomObjectSprite, RoomObjectSpriteType } from '@/api'

export class RoomObjectSprite implements IRoomObjectSprite {
  private static SPRITE_COUNTER: number = 0

  constructor() {
    this._id = RoomObjectSprite.SPRITE_COUNTER++
    this._name = ''
    this._type = ''
    this._spriteType = RoomObjectSpriteType.DEFAULT
    this._texture = null
    this._container = null

    this._width = 0
    this._height = 0
    this._offsetX = 0
    this._offsetY = 0
    this._flipH = false
    this._flipV = false
    this._direction = 0

    this._alpha = 255
    this._blendMode = BLEND_MODES.NORMAL
    this._color = 0xFFFFFF
    this._relativeDepth = 0
    this._varyingDepth = false
    this._libraryAssetName = ''
    this._clickHandling = false
    this._visible = true
    this._tag = ''
    this._posture = null
    this._alphaTolerance = AlphaTolerance.MATCH_OPAQUE_PIXELS
    this._filters = []

    this._updateCounter = 0
    this._updateContainer = false
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  public set id(id: number) {
    this._id = id
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    if (this._name === name) return

    this._name = name

    this._updateCounter++
  }

  private _type: string

  public get type(): string {
    return this._type
  }

  public set type(type: string) {
    this._type = type
  }

  private _spriteType: number

  public get spriteType(): number {
    return this._spriteType
  }

  public set spriteType(type: number) {
    this._spriteType = type
  }

  private _texture: Texture<Resource>

  public get texture(): Texture<Resource> {
    return this._texture
  }

  public set texture(texture: Texture<Resource>) {
    if (this._texture === texture) return

    if (texture) {
      this._width = texture.width
      this._height = texture.height
    }

    this._texture = texture

    this._updateCounter++
  }

  private _container: Container

  public get container(): Container {
    return this._container
  }

  public set container(container: Container) {
    if (this._container === container) return

    this.texture = Texture.EMPTY

    if (container) {
      this._width = container.width
      this._height = container.height
    }

    this._container = container

    this._updateCounter++

    this._updateContainer = true
  }

  private _width: number

  public get width(): number {
    return this._width
  }

  private _height: number

  public get height(): number {
    return this._height
  }

  private _offsetX: number

  public get offsetX(): number {
    return this._offsetX
  }

  public set offsetX(x: number) {
    if (this._offsetX === x) return

    this._offsetX = x

    this._updateCounter++
  }

  private _offsetY: number

  public get offsetY(): number {
    return this._offsetY
  }

  public set offsetY(y: number) {
    if (this._offsetY === y) return

    this._offsetY = y

    this._updateCounter++
  }

  private _flipH: boolean

  public get flipH(): boolean {
    return this._flipH
  }

  public set flipH(flip: boolean) {
    if (this._flipH === flip) return

    this._flipH = flip

    this._updateCounter++
  }

  private _flipV: boolean

  public get flipV(): boolean {
    return this._flipV
  }

  public set flipV(flip: boolean) {
    if (this._flipV === flip) return

    this._flipV = flip

    this._updateCounter++
  }

  private _direction: number

  public get direction(): number {
    return this._direction
  }

  public set direction(direction: number) {
    this._direction = direction
  }

  private _alpha: number

  public get alpha(): number {
    return this._alpha
  }

  public set alpha(alpha: number) {
    alpha = (alpha & 0xFF)

    if (this._alpha === alpha) return

    this._alpha = alpha

    this._updateCounter++
  }

  private _blendMode: number

  public get blendMode(): number {
    return this._blendMode
  }

  public set blendMode(blend: number) {
    if (this._blendMode === blend) return

    this._blendMode = blend

    this._updateCounter++
  }

  private _color: number

  public get color(): number {
    return this._color
  }

  public set color(color: number) {
    color = (color & 0xFFFFFF)

    if (this._color === color) return

    this._color = color

    this._updateCounter++
  }

  private _relativeDepth: number

  public get relativeDepth(): number {
    return this._relativeDepth
  }

  public set relativeDepth(depth: number) {
    if (this._relativeDepth === depth) return

    this._relativeDepth = depth

    this._updateCounter++
  }

  private _varyingDepth: boolean

  public get varyingDepth(): boolean {
    return this._varyingDepth
  }

  public set varyingDepth(flag: boolean) {
    if (flag === this._varyingDepth) return

    this._varyingDepth = flag

    this._updateCounter++
  }

  private _libraryAssetName: string

  public get libraryAssetName(): string {
    return this._libraryAssetName
  }

  public set libraryAssetName(value: string) {
    this._libraryAssetName = value
  }

  private _clickHandling: boolean

  public get clickHandling(): boolean {
    return this._clickHandling
  }

  public set clickHandling(flag: boolean) {
    this._clickHandling = flag
  }

  private _visible: boolean

  public get visible(): boolean {
    return this._visible
  }

  public set visible(visible: boolean) {
    if (this._visible === visible) return

    this._visible = visible

    this._updateCounter++
  }

  private _tag: string

  public get tag(): string {
    return this._tag
  }

  public set tag(tag: string) {
    if (this._tag === tag) return

    this._tag = tag

    this._updateCounter++
  }

  private _posture: string

  public get posture(): string {
    return this._posture
  }

  public set posture(posture: string) {
    if (this._posture === posture) return

    this._posture = posture

    this._updateCounter++
  }

  private _alphaTolerance: number

  public get alphaTolerance(): number {
    return this._alphaTolerance
  }

  public set alphaTolerance(tolerance: number) {
    if (this._alphaTolerance === tolerance) return

    this._alphaTolerance = tolerance

    this._updateCounter++
  }

  private _filters: Filter[]

  public get filters(): Filter[] {
    return this._filters
  }

  public set filters(filters: Filter[]) {
    this._filters = filters

    this._updateCounter++
  }

  private _updateCounter: number

  public get updateCounter(): number {
    return this._updateCounter
  }

  private _updateContainer: boolean

  public get updateContainer(): boolean {
    return this._updateContainer
  }

  public set updateContainer(flag: boolean) {
    this._updateContainer = flag
  }

  public dispose(): void {
    this._texture = null
    this._width = 0
    this._height = 0
  }
}
