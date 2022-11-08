import { IConnection, INitroCommunicationDemo, INitroCommunicationManager, NitroConfiguration, NitroLogger } from '../../api';
import { NitroManager } from '../../core';
import { NitroCommunicationDemoEvent, SocketConnectionEvent } from '../../events';
import { GetTickerTime } from '../../pixi-proxy';
import { Nitro } from '../Nitro';
import { AuthenticatedEvent, ClientHelloMessageComposer, ClientPingEvent, InfoRetrieveMessageComposer, PongMessageComposer, SSOTicketMessageComposer } from './messages';

export class NitroCommunicationDemo extends NitroManager implements INitroCommunicationDemo
{
    private _communication: INitroCommunicationManager;

    private _handShaking: boolean;
    private _didConnect: boolean;

    private _pongInterval: any;

    constructor(communication: INitroCommunicationManager)
    {
        super();

        this._communication = communication;

        this._handShaking = false;
        this._didConnect = false;

        this._pongInterval = null;

        this.onConnectionOpenedEvent = this.onConnectionOpenedEvent.bind(this);
        this.onConnectionClosedEvent = this.onConnectionClosedEvent.bind(this);
        this.onConnectionErrorEvent = this.onConnectionErrorEvent.bind(this);
        this.sendPong = this.sendPong.bind(this);
    }

    protected onInit(): void
    {
        const connection = this._communication.connection;

        if(connection)
        {
            connection.addEventListener(SocketConnectionEvent.CONNECTION_OPENED, this.onConnectionOpenedEvent);
            connection.addEventListener(SocketConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosedEvent);
            connection.addEventListener(SocketConnectionEvent.CONNECTION_ERROR, this.onConnectionErrorEvent);
        }

        this._communication.registerMessageEvent(new ClientPingEvent(this.onClientPingEvent.bind(this)));
        this._communication.registerMessageEvent(new AuthenticatedEvent(this.onAuthenticatedEvent.bind(this)));
    }

    protected onDispose(): void
    {
        const connection = this._communication.connection;

        if(connection)
        {
            connection.removeEventListener(SocketConnectionEvent.CONNECTION_OPENED, this.onConnectionOpenedEvent);
            connection.removeEventListener(SocketConnectionEvent.CONNECTION_CLOSED, this.onConnectionClosedEvent);
            connection.removeEventListener(SocketConnectionEvent.CONNECTION_ERROR, this.onConnectionErrorEvent);
        }

        this._handShaking = false;

        this.stopPonging();

        super.onDispose();
    }

    private onConnectionOpenedEvent(event: Event): void
    {
        const connection = this._communication.connection;

        if(!connection) return;

        this._didConnect = true;

        this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_ESTABLISHED, connection);

        if(NitroConfiguration.getValue<boolean>('system.pong.manually', false)) this.startPonging();

        this.startHandshake(connection);

        connection.send(new ClientHelloMessageComposer(null, null, null, null));

        this.tryAuthentication(connection);
    }

    private onConnectionClosedEvent(event: CloseEvent): void
    {
        const connection = this._communication.connection;

        if(!connection) return;

        this.stopPonging();

        if(this._didConnect) this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_CLOSED, connection);
    }

    private onConnectionErrorEvent(event: CloseEvent): void
    {
        const connection = this._communication.connection;

        if(!connection) return;

        this.stopPonging();

        this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_ERROR, connection);
    }

    private tryAuthentication(connection: IConnection): void
    {
        if(!connection || !this.getSSO())
        {
            if(!this.getSSO())
            {
                NitroLogger.error('Login without an SSO ticket is not supported');
            }

            this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKE_FAILED, connection);

            return;
        }

        connection.send(new SSOTicketMessageComposer(this.getSSO(), GetTickerTime()));
    }

    private onClientPingEvent(event: ClientPingEvent): void
    {
        if(!event || !event.connection) return;

        this.sendPong(event.connection);
    }

    private onAuthenticatedEvent(event: AuthenticatedEvent): void
    {
        if(!event || !event.connection) return;

        this.completeHandshake(event.connection);

        this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_AUTHENTICATED, event.connection);

        event.connection.send(new InfoRetrieveMessageComposer());
    }

    private startHandshake(connection: IConnection): void
    {
        this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKING, connection);

        this._handShaking = true;
    }

    private completeHandshake(connection: IConnection): void
    {
        this.dispatchCommunicationDemoEvent(NitroCommunicationDemoEvent.CONNECTION_HANDSHAKED, connection);

        this._handShaking = false;
    }

    private startPonging(): void
    {
        this.stopPonging();

        this._pongInterval = setInterval(this.sendPong, NitroConfiguration.getValue<number>('system.pong.interval.ms', 20000));
    }

    private stopPonging(): void
    {
        if(!this._pongInterval) return;

        clearInterval(this._pongInterval);

        this._pongInterval = null;
    }

    private sendPong(connection: IConnection = null): void
    {
        connection = ((connection || this._communication.connection) || null);

        if(!connection) return;

        connection.send(new PongMessageComposer());
    }

    private dispatchCommunicationDemoEvent(type: string, connection: IConnection): void
    {
        Nitro.instance.events.dispatchEvent(new NitroCommunicationDemoEvent(type, connection));
    }

    private getSSO(): string
    {
        return NitroConfiguration.getValue('sso.ticket', null);
    }
}
