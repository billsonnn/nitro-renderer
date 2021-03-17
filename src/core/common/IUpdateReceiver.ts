import { IDisposable } from './disposable/IDisposable';

export interface IUpdateReceiver extends IDisposable
{
    update(time: number): void;
}