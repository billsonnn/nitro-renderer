import { IEventDispatcher, IRoomObjectEventHandler } from '@/api'

export interface IRoomObjectLogicFactory {
  events: IEventDispatcher;

  getLogic(type: string): IRoomObjectEventHandler;

  registerEventFunction(func: Function): void;

  removeEventFunction(func: Function): void;
}
