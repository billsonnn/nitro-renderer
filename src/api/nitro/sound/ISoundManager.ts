import { INitroManager } from '../../common';
import { IMusicManager } from './IMusicManager';

export interface ISoundManager extends INitroManager
{
    musicManager: IMusicManager;
}
