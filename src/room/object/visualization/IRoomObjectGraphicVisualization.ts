import { IGraphicAssetCollection } from '../../../api';
import { IRoomObjectVisualization } from './IRoomObjectVisualization';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization
{
    asset: IGraphicAssetCollection;
}
