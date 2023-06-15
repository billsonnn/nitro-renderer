import { IAssetPlaneMaterialCell } from '@/api'

export interface IAssetPlaneMaterialCellColumn {
  repeatMode?: string;
  width?: number;
  cells?: IAssetPlaneMaterialCell[];
}
