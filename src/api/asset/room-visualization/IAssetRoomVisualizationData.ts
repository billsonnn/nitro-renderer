import { IAssetPlaneMaskData, IAssetPlaneVisualizationData } from '@/api'

export interface IAssetRoomVisualizationData {
  floorData?: IAssetPlaneVisualizationData;
  wallData?: IAssetPlaneVisualizationData;
  landscapeData?: IAssetPlaneVisualizationData;
  maskData?: IAssetPlaneMaskData;
}
