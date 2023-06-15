import { ColorData, FurnitureVisualization } from '@/nitro'

export class FurnitureStickieVisualization extends FurnitureVisualization {
  protected getLayerColor(scale: number, layerId: number, colorId: number): number {
    if (!this._data) return ColorData.DEFAULT_COLOR

    return this._data.getLayerColor(scale, layerId, colorId)
  }
}
