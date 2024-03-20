import { IConnection } from '@nitrots/api';
import { NitroEvent } from '../core';

export class NitroCommunicationDemoEvent extends NitroEvent
{
    public static CONNECTION_ESTABLISHED = 'NCE_ESTABLISHED';
    public static CONNECTION_CLOSED = 'NCE_CLOSED';
    public static CONNECTION_ERROR = 'NCE_ERROR';
    public static CONNECTION_HANDSHAKING = 'NCE_HANDSHAKING';
    public static CONNECTION_HANDSHAKED = 'NCE_HANDSHAKED';
    public static CONNECTION_HANDSHAKE_FAILED = 'NCE_HANDSHAKE_FAILED';
    public static CONNECTION_AUTHENTICATED = 'NCE_AUTHENTICATED';

    private _connection: IConnection;

    constructor(type: string, connection: IConnection)
    {
        super(type);

        this._connection = connection;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }
}
