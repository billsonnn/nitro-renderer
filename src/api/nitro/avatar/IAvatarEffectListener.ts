import { IDisposable } from '@/api'

export interface IAvatarEffectListener extends IDisposable {
  resetEffect(effect: number): void;
}
