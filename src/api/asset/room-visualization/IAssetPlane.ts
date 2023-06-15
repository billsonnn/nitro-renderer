import { IAssetPlaneVisualization } from '@/api'

export interface IAssetPlane {
  id?: string;
  visualizations?: IAssetPlaneVisualization[];
  animatedVisualization?: IAssetPlaneVisualization[];
}
