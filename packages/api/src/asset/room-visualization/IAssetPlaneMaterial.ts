import { IAssetPlaneMaterialCellMatrix } from './IAssetPlaneMaterialCellMatrix';

export interface IAssetPlaneMaterial
{
    id?: string;
    matrices?: IAssetPlaneMaterialCellMatrix[];
}
