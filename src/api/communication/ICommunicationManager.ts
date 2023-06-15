import { IConnection, IConnectionStateListener, IDisposable } from '@/api'

export interface ICommunicationManager extends IDisposable {
  createConnection(stateListener?: IConnectionStateListener): IConnection;
}
