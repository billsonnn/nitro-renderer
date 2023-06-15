import { IAssetPlaneMaterialCellMatrix } from '@/api'

export interface IAssetPlaneMaterial {
  id?: string;
  matrices?: IAssetPlaneMaterialCellMatrix[];
}
