import { IDisposable } from '../../core/common/disposable/IDisposable';

export interface IAvatarEffectListener extends IDisposable
{
    resetEffect(effect: number): void;
}