import { BLEND_MODES } from '@pixi/constants'

export class LayerData {
  public static DEFAULT_COUNT: number = 0
  public static DEFAULT_DIRECTION: number = 0
  public static DEFAULT_TAG: string = ''
  public static DEFAULT_INK: number = BLEND_MODES.NORMAL
  public static DEFAULT_ALPHA: number = 255
  public static DEFAULT_IGNORE_MOUSE: boolean = false
  public static DEFAULT_XOFFSET: number = 0
  public static DEFAULT_YOFFSET: number = 0
  public static DEFAULT_ZOFFSET: number = 0

  constructor() {
    this._tag = LayerData.DEFAULT_TAG
    this._ink = LayerData.DEFAULT_INK
    this._alpha = LayerData.DEFAULT_ALPHA
    this._ignoreMouse = LayerData.DEFAULT_IGNORE_MOUSE
    this._xOffset = LayerData.DEFAULT_XOFFSET
    this._yOffset = LayerData.DEFAULT_YOFFSET
    this._zOffset = LayerData.DEFAULT_ZOFFSET
  }

  private _tag: string

  public get tag(): string {
    return this._tag
  }

  public set tag(tag: string) {
    this._tag = tag
  }

  private _ink: number

  public get ink(): number {
    return this._ink
  }

  public set ink(ink: number) {
    this._ink = ink
  }

  private _alpha: number

  public get alpha(): number {
    return this._alpha
  }

  public set alpha(alpha: number) {
    this._alpha = alpha
  }

  private _ignoreMouse: boolean

  public get ignoreMouse(): boolean {
    return this._ignoreMouse
  }

  public set ignoreMouse(flag: boolean) {
    this._ignoreMouse = flag
  }

  private _xOffset: number

  public get xOffset(): number {
    return this._xOffset
  }

  public set xOffset(offset: number) {
    this._xOffset = offset
  }

  private _yOffset: number

  public get yOffset(): number {
    return this._yOffset
  }

  public set yOffset(offset: number) {
    this._yOffset = offset
  }

  private _zOffset: number

  public get zOffset(): number {
    return this._zOffset
  }

  public set zOffset(offset: number) {
    this._zOffset = offset
  }

  public setFromLayer(layer: LayerData): void {
    if (!layer) return

    this._tag = layer.tag
    this._ink = layer.ink
    this._alpha = layer.alpha
    this._ignoreMouse = layer.ignoreMouse
    this._xOffset = layer.xOffset
    this._yOffset = layer.yOffset
    this._zOffset = layer.zOffset
  }
}
