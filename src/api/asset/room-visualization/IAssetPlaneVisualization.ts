import { IAssetPlaneVisualizationAnimatedLayer } from './IAssetPlaneVisualizationAnimatedLayer';
import { IAssetPlaneVisualizationLayer } from './IAssetPlaneVisualizationLayer';

export interface IAssetPlaneVisualization
{
    size?: number;
    horizontalAngle?: number;
    verticalAngle?: number;
    allLayers?: (IAssetPlaneVisualizationLayer | IAssetPlaneVisualizationAnimatedLayer)[];
}
