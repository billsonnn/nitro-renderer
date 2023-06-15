import { IAssetAnimationFrame } from '@/api'

export interface IAssetAnimationOverride {
  name?: string;
  override?: string;
  frames?: IAssetAnimationFrame[];
}
