import { IDisposable } from './IDisposable';

export interface IUpdateReceiver extends IDisposable
{
    update(time: number): void;
}
