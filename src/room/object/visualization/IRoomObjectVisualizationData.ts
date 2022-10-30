import { IAssetData } from '../../../api';

export interface IObjectVisualizationData
{
    initialize(asset: IAssetData): boolean;
    dispose(): void;
}
