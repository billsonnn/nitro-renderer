import { IAssetPlane } from './IAssetPlane';
import { IAssetPlaneMaterial } from './IAssetPlaneMaterial';
import { IAssetPlaneTexture } from './IAssetPlaneTexture';

export interface IAssetPlaneVisualizationData
{
    planes?: IAssetPlane[];
    materials?: IAssetPlaneMaterial[];
    textures?: IAssetPlaneTexture[];
}
