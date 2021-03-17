import { IAssetData } from '../../../core/asset/interfaces';

export interface IObjectVisualizationData
{
    initialize(asset: IAssetData): boolean;
    dispose(): void;
}