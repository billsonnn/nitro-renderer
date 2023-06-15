import { IAssetPlaneMaterialCellColumn } from '@/api'

export interface IAssetPlaneMaterialCellMatrix {
  repeatMode?: string;
  align?: string;
  normalMinX?: number;
  normalMaxX?: number;
  normalMinY?: number;
  normalMaxY?: number;
  columns?: IAssetPlaneMaterialCellColumn[];
}
