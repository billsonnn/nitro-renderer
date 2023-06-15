import { IConnection, IMessageParser } from '@/api'

export interface IMessageEvent {
  callBack: Function;
  parserClass: Function;
  parser: IMessageParser;
  connection: IConnection;

  dispose(): void;
}
