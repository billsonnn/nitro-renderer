import { IAssetVisualizationLayer } from '@/api'

export interface IAssetVisualizationDirection {
  layers?: { [index: string]: IAssetVisualizationLayer };
}
