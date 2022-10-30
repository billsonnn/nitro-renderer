import { IDisposable } from '../common';
import { IConnection } from './IConnection';
import { IConnectionStateListener } from './IConnectionStateListener';

export interface ICommunicationManager extends IDisposable
{
    createConnection(stateListener?: IConnectionStateListener): IConnection;
}
