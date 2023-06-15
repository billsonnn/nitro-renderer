import { IDisposable } from '@/api'

export interface IUpdateReceiver extends IDisposable {
  update(time: number): void;
}
