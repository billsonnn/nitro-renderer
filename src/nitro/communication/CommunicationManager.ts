import { ICommunicationManager, IConnection, IMessageConfiguration, IMessageEvent, NitroConfiguration } from '../../api';
import { NitroEventDispatcher, NitroEventType } from '../../events';
import { GetTickerTime } from '../../pixi-proxy';
import { NitroMessages } from './NitroMessages';
import { SocketConnection } from './SocketConnection';
import { AuthenticatedEvent, ClientHelloMessageComposer, ClientPingEvent, InfoRetrieveMessageComposer, PongMessageComposer, SSOTicketMessageComposer } from './messages';

export class CommunicationManager implements ICommunicationManager
{
    private _connection: IConnection = new SocketConnection();
    private _messages: IMessageConfiguration = new NitroMessages();

    private _pongInterval: any = null;

    constructor()
    {
        this._connection.registerMessages(this._messages);
    }

    public async init(): Promise<void>
    {
        NitroEventDispatcher.addEventListener(NitroEventType.SOCKET_CLOSED, () =>
        {
            this.stopPong();
        });

        return new Promise((resolve, reject) =>
        {
            NitroEventDispatcher.addEventListener(NitroEventType.SOCKET_OPENED, () =>
            {
                if(NitroConfiguration.getValue<boolean>('system.pong.manually', false)) this.startPong();

                this._connection.send(new ClientHelloMessageComposer(null, null, null, null));
                this._connection.send(new SSOTicketMessageComposer(NitroConfiguration.getValue('sso.ticket', null), GetTickerTime()));
            });

            NitroEventDispatcher.addEventListener(NitroEventType.SOCKET_ERROR, () =>
            {
                reject();
            });

            this._connection.addMessageEvent(new ClientPingEvent((event: ClientPingEvent) => this.sendPong()));

            this._connection.addMessageEvent(new AuthenticatedEvent((event: AuthenticatedEvent) =>
            {
                this._connection.authenticated();

                resolve();

                event.connection.send(new InfoRetrieveMessageComposer());
            }));

            this._connection.init(NitroConfiguration.getValue<string>('socket.url'));
        });
    }

    protected startPong(): void
    {
        if(this._pongInterval) this.stopPong();

        this._pongInterval = setInterval(() => this.sendPong(), NitroConfiguration.getValue<number>('system.pong.interval.ms', 20000));
    }

    protected stopPong(): void
    {
        if(!this._pongInterval) return;

        clearInterval(this._pongInterval);

        this._pongInterval = null;
    }

    protected sendPong(): void
    {
        this._connection?.send(new PongMessageComposer());
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

    public get connection(): IConnection
    {
        return this._connection;
    }
}
