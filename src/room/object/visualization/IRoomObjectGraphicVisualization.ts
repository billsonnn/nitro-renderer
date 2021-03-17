import { IRoomObjectVisualization } from './IRoomObjectVisualization';
import { IGraphicAssetCollection } from './utils/IGraphicAssetCollection';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization
{
    asset: IGraphicAssetCollection;
}