import { IMusicController } from './IMusicController';

export interface ISoundManager
{
    init(): Promise<void>;
    musicController: IMusicController;
    traxVolume: number;
}
