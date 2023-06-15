import { IDisposable, INitroEvent } from '@/api'

export interface IEventDispatcher extends IDisposable {
  addEventListener(type: string, callback: Function): void

  removeEventListener(type: string, callback: Function): void;

  removeAllListeners(): void;

  dispatchEvent(event: INitroEvent): boolean;
}
