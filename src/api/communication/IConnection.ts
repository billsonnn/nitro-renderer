import { IEventDispatcher, IMessageComposer, IMessageConfiguration, IMessageEvent } from '@/api'

export interface IConnection extends IEventDispatcher {
  isAuthenticated: boolean;
  dataBuffer: ArrayBuffer;

  init(socketUrl: string): void;

  dispose(): void;

  onReady(): void;

  authenticated(): void;

  send(...composers: IMessageComposer<unknown[]>[]): void;

  processReceivedData(): void;

  registerMessages(configuration: IMessageConfiguration): void;

  addMessageEvent(event: IMessageEvent): void;

  removeMessageEvent(event: IMessageEvent): void;
}
