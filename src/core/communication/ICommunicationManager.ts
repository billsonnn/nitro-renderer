import { IDisposable } from '../common/disposable/IDisposable';
import { IConnection } from './connections/IConnection';
import { IConnectionStateListener } from './connections/IConnectionStateListener';

export interface ICommunicationManager extends IDisposable
{
    createConnection(stateListener?: IConnectionStateListener): IConnection;
}