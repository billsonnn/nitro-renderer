import { Resource, Texture } from '@pixi/core'
import { Graphics } from '@pixi/graphics'
import { Matrix } from '@pixi/math'
import { Sprite } from '@pixi/sprite'
import { PixiApplicationProxy, TextureUtils } from '@/pixi-proxy'

export class Rasterizer {

  public static getFlipHBitmapData(k: Texture<Resource>): Texture<Resource> {
    if (!k) return null

    const renderTexture = TextureUtils.createRenderTexture(k.width, k.height)

    const matrix = new Matrix()

    matrix.scale(-1, 1)
    matrix.translate(k.width, 0)

    PixiApplicationProxy.instance.renderer.render(new Sprite(k), {
      renderTexture,
      clear: true,
      transform: matrix
    })

    return renderTexture
  }

  public static getFlipVBitmapData(k: Texture<Resource>): Texture<Resource> {
    if (!k) return null

    const matrix = new Matrix()

    matrix.scale(1, -1)
    matrix.translate(0, k.height)

    const graphic = new Graphics()

    graphic
      .beginTextureFill({
        texture: k,
        matrix
      })
      .drawRect(0, 0, k.width, k.height)
      .endFill()

    return TextureUtils.generateTexture(graphic)
  }

  public static getFlipHVBitmapData(k: Texture<Resource>): Texture<Resource> {
    if (!k) return null

    const matrix = new Matrix()

    matrix.scale(-1, -1)
    matrix.translate(k.width, k.height)

    const graphic = new Graphics()

    graphic
      .beginTextureFill({
        texture: k,
        matrix
      })
      .drawRect(0, 0, k.width, k.height)
      .endFill()

    return TextureUtils.generateTexture(graphic)
  }
}
