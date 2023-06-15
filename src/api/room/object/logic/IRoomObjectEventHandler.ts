import {
  IDisposable,
  IEventDispatcher,
  IRoomObjectController,
  IRoomObjectMouseHandler,
  IRoomObjectUpdateMessage
} from '@/api'

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler, IDisposable {
  object: IRoomObjectController;
  eventDispatcher: IEventDispatcher;
  widget: string;
  contextMenu: string;

  initialize(data: unknown): void;

  update(totalTimeRunning: number): void;

  processUpdateMessage(message: IRoomObjectUpdateMessage): void;

  getEventTypes(): string[];

  useObject(): void;

  setObject(object: IRoomObjectController): void;

  tearDown(): void;
}
