import { IAssetData } from '../../../asset';

export interface IObjectVisualizationData
{
    initialize(asset: IAssetData): boolean;
    dispose(): void;
}
