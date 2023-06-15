import { IAssetPlaneVisualizationAnimatedLayer, IAssetPlaneVisualizationLayer } from '@/api'

export interface IAssetPlaneVisualization {
  size?: number;
  horizontalAngle?: number;
  verticalAngle?: number;
  allLayers?: (IAssetPlaneVisualizationLayer | IAssetPlaneVisualizationAnimatedLayer)[];
}
