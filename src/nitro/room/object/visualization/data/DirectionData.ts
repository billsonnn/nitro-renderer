import { LayerData } from '@/nitro'

export class DirectionData {
  public static USE_DEFAULT_DIRECTION: number = -1

  private _layers: LayerData[]

  constructor(layerCount: number) {
    this._layers = []

    this.createLayers(layerCount)
  }

  public get layerCount(): number {
    return this._layers.length
  }

  public dispose(): void {
    this._layers = []
  }

  public setFromDirection(directionData: DirectionData): void {
    if (!directionData) return

    const totalLayers = this.layerCount

    if (totalLayers !== directionData.layerCount) return

    for (let i = 0; i < totalLayers; i++) {
      const localLayer = this.getLayer(i)
      const directionLayer = directionData.getLayer(i)

      if (!localLayer) continue

      localLayer.setFromLayer(directionLayer)
    }
  }

  public getLayer(layerId: number): LayerData {
    const existing = this._layers[layerId]

    if (!existing) return null

    return existing
  }

  public getLayerTag(layerId: number): string {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_TAG

    return existing.tag
  }

  public setLayerTag(layerId: number, tag: string): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    existing.tag = tag
  }

  public getLayerInk(layerId: number): number {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_INK

    return existing.ink
  }

  public setLayerInk(layerId: number, ink: number): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    if (isNaN(ink)) return

    existing.ink = ink
  }

  public getLayerAlpha(layerId: number): number {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_ALPHA

    return existing.alpha
  }

  public setLayerAlpha(layerId: number, alpha: number): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    if (isNaN(alpha)) return

    existing.alpha = alpha
  }

  public getLayerIgnoreMouse(layerId: number): boolean {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_IGNORE_MOUSE

    return existing.ignoreMouse
  }

  public setLayerIgnoreMouse(layerId: number, flag: boolean): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    existing.ignoreMouse = flag || false
  }

  public getLayerXOffset(layerId: number): number {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_XOFFSET

    return existing.xOffset
  }

  public setLayerXOffset(layerId: number, offset: number): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    if (isNaN(offset)) return

    existing.xOffset = offset
  }

  public getLayerYOffset(layerId: number): number {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_YOFFSET

    return existing.yOffset
  }

  public setLayerYOffset(layerId: number, offset: number): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    if (isNaN(offset)) return

    existing.yOffset = offset
  }

  public getLayerZOffset(layerId: number): number {
    const existing = this.getLayer(layerId)

    if (!existing) return LayerData.DEFAULT_ZOFFSET

    return existing.zOffset
  }

  public setLayerZOffset(layerId: number, offset: number): void {
    const existing = this.getLayer(layerId)

    if (!existing) return

    if (isNaN(offset)) return

    existing.zOffset = offset
  }

  private createLayers(count: number): void {
    if (!count) return

    for (let i = 0; i < count; i++) this._layers.push(new LayerData())
  }
}
