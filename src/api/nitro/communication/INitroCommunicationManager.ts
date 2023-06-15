import { IConnection, IMessageEvent, INitroCommunicationDemo, INitroManager } from '@/api'

export interface INitroCommunicationManager extends INitroManager {
  demo: INitroCommunicationDemo;
  connection: IConnection;

  registerMessageEvent(event: IMessageEvent): IMessageEvent;

  removeMessageEvent(event: IMessageEvent): void;
}
