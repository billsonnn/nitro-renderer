import { Resource, Texture } from '@pixi/core'

export class BadgeInfo {
  constructor(image: Texture<Resource>, placeHolder: boolean) {
    this._image = image
    this._placeHolder = placeHolder
  }

  private _image: Texture<Resource>

  public get image(): Texture<Resource> {
    return this._image
  }

  private _placeHolder: boolean

  public get placeHolder(): boolean {
    return this._placeHolder
  }
}
