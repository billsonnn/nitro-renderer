import { Resource, Texture } from '@pixi/core'
import { ColorMatrix } from '@pixi/filter-color-matrix'
import { IRoomCameraWidgetEffect } from '@/api'

export class RoomCameraWidgetEffect implements IRoomCameraWidgetEffect {
  constructor(name: string, minLevel: number = -1, texture: Texture<Resource> = null, colorMatrix: ColorMatrix = null, blendMode: number = null) {
    this._name = name
    this._minLevel = minLevel
    this._texture = texture
    this._colorMatrix = colorMatrix
    this._blendMode = blendMode
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _minLevel: number = -1

  public get minLevel(): number {
    return this._minLevel
  }

  private _texture: Texture<Resource> = null

  public get texture(): Texture<Resource> {
    return this._texture
  }

  public set texture(texture: Texture<Resource>) {
    this._texture = texture
  }

  private _colorMatrix: ColorMatrix = null

  public get colorMatrix(): ColorMatrix {
    return this._colorMatrix
  }

  public set colorMatrix(colorMatrix: ColorMatrix) {
    this._colorMatrix = colorMatrix
  }

  private _blendMode: number = null

  public get blendMode(): number {
    return this._blendMode
  }

  public set blendMode(blendMode: number) {
    this._blendMode = blendMode
  }
}
