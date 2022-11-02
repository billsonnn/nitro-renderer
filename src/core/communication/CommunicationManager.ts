import { ICommunicationManager, IConnection, IConnectionStateListener, IUpdateReceiver } from '../../api';
import { Disposable } from '../common';
import { SocketConnection } from './SocketConnection';

export class CommunicationManager extends Disposable implements ICommunicationManager, IUpdateReceiver
{
    private _connections: IConnection[];

    constructor()
    {
        super();

        this._connections = [];
    }

    protected onDispose(): void
    {
        if(!this._connections || !this._connections.length) return;

        for(const connection of this._connections.values()) connection && connection.dispose();
    }

    public createConnection(stateListener: IConnectionStateListener = null): IConnection
    {
        const connection = new SocketConnection(this, stateListener);

        if(!connection) return;

        this._connections.push(connection);

        return connection;
    }

    public update(time: number): void
    {
        let index = 0;

        while(index < this._connections.length)
        {
            const connection = this._connections[index];

            connection.processReceivedData();

            if(this.disposed) return;

            if(connection.disposed) this._connections.splice(index, 1);
            else index++;
        }
    }
}
