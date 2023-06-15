import { RenderTexture } from '@pixi/core'

export class PlaneBitmapData {
  constructor(texture: RenderTexture, timestamp: number) {
    this._texture = texture
    this._timeStamp = timestamp
  }

  private _texture: RenderTexture

  public get texture(): RenderTexture {
    return this._texture
  }

  private _timeStamp: number

  public get timeStamp(): number {
    return this._timeStamp
  }

  public dispose(): void {
    this._texture = null
  }
}
