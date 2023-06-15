import { IMusicController, INitroManager } from '@/api'

export interface ISoundManager extends INitroManager {
  get musicController(): IMusicController;

  get traxVolume(): number;
}
