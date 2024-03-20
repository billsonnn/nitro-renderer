import { IGraphicAssetCollection } from '../../../asset';
import { IRoomObjectVisualization } from './IRoomObjectVisualization';

export interface IRoomObjectGraphicVisualization extends IRoomObjectVisualization
{
    asset: IGraphicAssetCollection;
}
