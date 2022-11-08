import { INitroManager } from '../../common';
import { IMusicController } from './IMusicController';

export interface ISoundManager extends INitroManager
{
    get musicController(): IMusicController;
    get traxVolume(): number;
}
