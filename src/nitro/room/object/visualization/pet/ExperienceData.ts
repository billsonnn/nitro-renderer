import { RenderTexture, Resource, Texture } from '@pixi/core'
import { Sprite } from '@pixi/sprite'
import { Text } from '@pixi/text'
import { NitroContainer, NitroSprite, PixiApplicationProxy, TextureUtils } from '@/pixi-proxy'

export class ExperienceData {
  private _sprite: Sprite
  private _texture: RenderTexture

  constructor(texture: Texture<Resource>) {
    this._sprite = new NitroSprite(texture)
    this._texture = null
    this._amount = -1
    this._alpha = 0
  }

  private _amount: number

  public get amount(): number {
    return this._amount
  }

  public set amount(amount: number) {
    this._amount = amount
  }

  private _alpha: number

  public get alpha(): number {
    return this._alpha
  }

  public set alpha(alpha: number) {
    this._alpha = alpha
  }

  public renderBubble(amount: number): RenderTexture {
    if (!this._sprite || (this._amount === amount)) return null

    const container = new NitroContainer()

    container.addChild(this._sprite)

    const text = new Text(('+' + amount), {
      fontFamily: 'Arial',
      fontSize: 9,
      fill: 0xFFFFFF,
      align: 'center'
    })

    text.anchor.x = 0.5

    text.x = (this._sprite.width / 2)
    text.y = 19

    container.addChild(text)

    if (!this._texture) {
      this._texture = TextureUtils.generateTexture(container)
    } else {
      PixiApplicationProxy.instance.renderer.render(container, {
        renderTexture: this._texture,
        clear: true
      })
    }

    return this._texture
  }
}
