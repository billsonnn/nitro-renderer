import { IAssetColorLayer } from '@/api'

export interface IAssetColor {
  layers?: { [index: string]: IAssetColorLayer };
}
