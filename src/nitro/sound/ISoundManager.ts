import { INitroManager } from '../../core/common/INitroManager';
import { IMusicManager } from './music/IMusicManager';

export interface ISoundManager extends INitroManager
{
    musicManager: IMusicManager;
}
