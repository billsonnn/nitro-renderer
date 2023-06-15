import { IAssetVisualAnimationSequenceFrame } from '@/api'

export interface IAssetVisualAnimationSequence {
  loopCount?: number;
  random?: number;
  frames?: { [index: string]: IAssetVisualAnimationSequenceFrame };
}
