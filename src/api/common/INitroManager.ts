import { IDisposable, IEventDispatcher } from '@/api'

export interface INitroManager extends IDisposable {
  events: IEventDispatcher;
  isLoaded: boolean;
  isLoading: boolean;

  init(): void;
}
