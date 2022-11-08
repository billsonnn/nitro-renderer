import { ICommunicationManager, IConnection, IConnectionStateListener, IMessageConfiguration, IMessageEvent, INitroCommunicationDemo, INitroCommunicationManager, INitroEvent, NitroConfiguration, NitroLogger } from '../../api';
import { NitroManager } from '../../core';
import { NitroCommunicationDemoEvent, SocketConnectionEvent } from '../../events';
import { Nitro } from '../Nitro';
import { NitroCommunicationDemo } from './NitroCommunicationDemo';
import { NitroMessages } from './NitroMessages';

export class NitroCommunicationManager extends NitroManager implements INitroCommunicationManager, IConnectionStateListener
{
    private _communication: ICommunicationManager;
    private _connection: IConnection;
    private _messages: IMessageConfiguration;

    private _demo: INitroCommunicationDemo;

    constructor(communication: ICommunicationManager)
    {
        super();

        this._communication = communication;
        this._connection = null;
        this._messages = new NitroMessages();

        this._demo = new NitroCommunicationDemo(this);

        this.onConnectionOpenedEvent = this.onConnectionOpenedEvent.bind(this);
        this.onConnectionClosedEvent = this.onConnectionClosedEvent.bind(this);
        this.onConnectionErrorEvent = this.onConnectionErrorEvent.bind(this);
        this.onConnectionAuthenticatedEvent = this.onConnectionAuthenticatedEvent.bind(this);
    }

    protected onInit(): void
    {
        if(this._connection) return;

        Nitro.instance.events.addEventListener(NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED, this.onConnectionAuthenticatedEvent);

        this._connection = this._communication.createConnection(this);

        this._connection.registerMessages(this._messages);

        this._connection.addEventListener(SocketConnectionEvent.CONNECTION_OPENED, this.onConnectionOpenedEvent);
        this._connection.addEventListener(SocketConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosedEvent);
        this._connection.addEventListener(SocketConnectionEvent.CONNECTION_ERROR, this.onConnectionErrorEvent);

        if(this._demo) this._demo.init();

        this._connection.init(NitroConfiguration.getValue<string>('socket.url'));
    }

    protected onDispose(): void
    {
        if(this._demo) this._demo.dispose();

        if(this._connection)
        {
            this._connection.removeEventListener(SocketConnectionEvent.CONNECTION_OPENED, this.onConnectionOpenedEvent);
            this._connection.removeEventListener(SocketConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosedEvent);
            this._connection.removeEventListener(SocketConnectionEvent.CONNECTION_ERROR, this.onConnectionErrorEvent);
        }

        Nitro.instance.events.removeEventListener(NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED, this.onConnectionAuthenticatedEvent);

        super.onDispose();
    }

    private onConnectionOpenedEvent(event: Event): void
    {
        NitroLogger.log('Connection Initialized');
    }

    private onConnectionClosedEvent(event: CloseEvent): void
    {
        NitroLogger.log('Connection Closed');
    }

    private onConnectionErrorEvent(event: Event): void
    {
        NitroLogger.log('Connection Error');
    }

    private onConnectionAuthenticatedEvent(event: INitroEvent): void
    {
        NitroLogger.log('Connection Authenticated');

        if(this._connection) this._connection.authenticated();
    }

    public connectionInit(socketUrl: string): void
    {
        NitroLogger.log('Initializing Connection', socketUrl);
    }

    public registerMessageEvent(event: IMessageEvent): IMessageEvent
    {
        if(this._connection) this._connection.addMessageEvent(event);

        return event;
    }

    public removeMessageEvent(event: IMessageEvent): void
    {
        if(!this._connection) return;

        this._connection.removeMessageEvent(event);
    }

    public get demo(): INitroCommunicationDemo
    {
        return this._demo;
    }

    public get connection(): IConnection
    {
        return this._connection;
    }
}
