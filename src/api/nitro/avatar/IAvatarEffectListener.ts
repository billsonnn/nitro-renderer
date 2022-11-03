import { IDisposable } from '../../common';

export interface IAvatarEffectListener extends IDisposable
{
    resetEffect(effect: number): void;
}
