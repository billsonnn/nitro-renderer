import {
  IAssetAnimationAdd,
  IAssetAnimationAvatar,
  IAssetAnimationDirection,
  IAssetAnimationFrame,
  IAssetAnimationOverride,
  IAssetAnimationRemove,
  IAssetAnimationShadow,
  IAssetAnimationSprite
} from '@/api'

export interface IAssetAnimation {
  name?: string;
  desc?: string;
  resetOnToggle?: boolean;
  directions?: IAssetAnimationDirection[];
  shadows?: IAssetAnimationShadow[];
  adds?: IAssetAnimationAdd[];
  removes?: IAssetAnimationRemove[];
  sprites?: IAssetAnimationSprite[];
  frames?: IAssetAnimationFrame[];
  avatars?: IAssetAnimationAvatar[];
  overrides?: IAssetAnimationOverride[];
}
