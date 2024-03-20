import { IAssetPlaneVisualization } from './IAssetPlaneVisualization';

export interface IAssetPlane
{
    id?: string;
    visualizations?: IAssetPlaneVisualization[];
    animatedVisualization?: IAssetPlaneVisualization[];
}
