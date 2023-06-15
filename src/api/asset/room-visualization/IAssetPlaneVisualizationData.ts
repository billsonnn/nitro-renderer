import { IAssetPlane, IAssetPlaneMaterial, IAssetPlaneTexture } from '@/api'

export interface IAssetPlaneVisualizationData {
  planes?: IAssetPlane[];
  materials?: IAssetPlaneMaterial[];
  textures?: IAssetPlaneTexture[];
}
