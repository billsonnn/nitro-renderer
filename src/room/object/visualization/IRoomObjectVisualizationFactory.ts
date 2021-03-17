import { IAssetData } from '../../../core/asset/interfaces';
import { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import { IObjectVisualizationData } from './IRoomObjectVisualizationData';

export interface IRoomObjectVisualizationFactory
{
    getVisualization(type: string): IRoomObjectGraphicVisualization;
    getVisualizationData(type: string, visualization: string, asset: IAssetData): IObjectVisualizationData;
}