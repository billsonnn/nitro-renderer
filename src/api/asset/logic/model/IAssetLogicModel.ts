import { IAssetDimension } from '@/api'

export interface IAssetLogicModel {
  dimensions?: IAssetDimension;
  directions?: number[];
}
