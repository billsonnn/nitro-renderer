import { IAssetData, IObjectVisualizationData, IRoomObjectGraphicVisualization } from '@/api'

export interface IRoomObjectVisualizationFactory {
  getVisualization(type: string): IRoomObjectGraphicVisualization;

  getVisualizationData(type: string, visualization: string, asset: IAssetData): IObjectVisualizationData;
}
