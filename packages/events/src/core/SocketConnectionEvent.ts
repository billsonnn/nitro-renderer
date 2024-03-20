import { IConnection } from '@nitrots/api';
import { NitroEvent } from './NitroEvent';

export class SocketConnectionEvent extends NitroEvent
{
    public static CONNECTION_OPENED = 'SCE_OPEN';
    public static CONNECTION_CLOSED = 'SCE_CLOSED';
    public static CONNECTION_ERROR = 'SCE_ERROR';
    public static CONNECTION_MESSAGE = 'SCE_MESSAGE';

    private _connection: IConnection;
    private _originalEvent: Event;

    constructor(type: string, connection: IConnection, originalEvent: Event)
    {
        super(type);

        this._connection = connection;
        this._originalEvent = event;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }

    public get originalEvent(): Event
    {
        return this._originalEvent;
    }
}
