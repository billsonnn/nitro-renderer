import { INitroManager } from '../../api';
import { IMusicManager } from './music/IMusicManager';

export interface ISoundManager extends INitroManager
{
    musicManager: IMusicManager;
}
