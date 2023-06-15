import { IGraphicAssetCollection, IRoomObjectVisualization } from '@/api'

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization {
  asset: IGraphicAssetCollection;
}
