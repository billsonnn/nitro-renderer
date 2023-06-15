import { IAssetLogicModel, IAssetLogicPlanetSystem, ICustomVars, IParticleSystem, ISoundSample } from '@/api'

export interface IAssetLogicData {
  model?: IAssetLogicModel;
  maskType?: string;
  credits?: string;
  soundSample?: ISoundSample;
  action?: { link?: string, startState?: number };
  planetSystems?: IAssetLogicPlanetSystem[];
  particleSystems?: IParticleSystem[];
  customVars?: ICustomVars;
}
