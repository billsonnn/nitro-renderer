import { IAssetAnimationFramePart } from '@/api'

export interface IAssetAnimationFrame {
  repeats?: number;
  fxs?: IAssetAnimationFramePart[];
  bodyparts?: IAssetAnimationFramePart[];
}
