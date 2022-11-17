import { ICodec, ICommunicationManager, IConnection, IConnectionStateListener, IMessageComposer, IMessageConfiguration, IMessageDataWrapper, IMessageEvent, NitroLogger, WebSocketEventEnum } from '../../api';
import { SocketConnectionEvent } from '../../events';
import { EventDispatcher } from '../common';
import { EvaWireFormat } from './codec';
import { MessageClassManager } from './messages';

export class SocketConnection extends EventDispatcher implements IConnection
{
    private _communicationManager: ICommunicationManager;
    private _stateListener: IConnectionStateListener;
    private _socket: WebSocket;
    private _messages: MessageClassManager;
    private _codec: ICodec;
    private _dataBuffer: ArrayBuffer;
    private _isReady: boolean;

    private _pendingClientMessages: IMessageComposer<unknown[]>[];
    private _pendingServerMessages: IMessageDataWrapper[];

    private _isAuthenticated: boolean;

    constructor(communicationManager: ICommunicationManager, stateListener: IConnectionStateListener)
    {
        super();

        this._communicationManager = communicationManager;
        this._stateListener = stateListener;
        this._socket = null;
        this._messages = new MessageClassManager();
        this._codec = new EvaWireFormat();
        this._dataBuffer = null;
        this._isReady = false;

        this._pendingClientMessages = [];
        this._pendingServerMessages = [];

        this._isAuthenticated = false;

        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }

    public init(socketUrl: string): void
    {
        if(this._stateListener)
        {
            this._stateListener.connectionInit(socketUrl);
        }

        this.createSocket(socketUrl);
    }

    protected onDispose(): void
    {
        super.onDispose();

        this.destroySocket();

        this._communicationManager = null;
        this._stateListener = null;
        this._messages = null;
        this._codec = null;
        this._dataBuffer = null;
    }

    public onReady(): void
    {
        if(this._isReady) return;

        this._isReady = true;

        if(this._pendingServerMessages && this._pendingServerMessages.length) this.processWrappers(...this._pendingServerMessages);

        if(this._pendingClientMessages && this._pendingClientMessages.length) this.send(...this._pendingClientMessages);

        this._pendingServerMessages = [];
        this._pendingClientMessages = [];
    }

    private createSocket(socketUrl: string): void
    {
        if(!socketUrl) return;

        this.destroySocket();

        this._dataBuffer = new ArrayBuffer(0);
        this._socket = new WebSocket(socketUrl);

        this._socket.addEventListener(WebSocketEventEnum.CONNECTION_OPENED, this.onOpen);
        this._socket.addEventListener(WebSocketEventEnum.CONNECTION_CLOSED, this.onClose);
        this._socket.addEventListener(WebSocketEventEnum.CONNECTION_ERROR, this.onError);
        this._socket.addEventListener(WebSocketEventEnum.CONNECTION_MESSAGE, this.onMessage);
    }

    private destroySocket(): void
    {
        if(!this._socket) return;

        this._socket.removeEventListener(WebSocketEventEnum.CONNECTION_OPENED, this.onOpen);
        this._socket.removeEventListener(WebSocketEventEnum.CONNECTION_CLOSED, this.onClose);
        this._socket.removeEventListener(WebSocketEventEnum.CONNECTION_ERROR, this.onError);
        this._socket.removeEventListener(WebSocketEventEnum.CONNECTION_MESSAGE, this.onMessage);

        if(this._socket.readyState === WebSocket.OPEN) this._socket.close();

        this._socket = null;
    }

    private onOpen(event: Event): void
    {
        this.dispatchConnectionEvent(SocketConnectionEvent.CONNECTION_OPENED, event);
    }

    private onClose(event: CloseEvent): void
    {
        this.dispatchConnectionEvent(SocketConnectionEvent.CONNECTION_CLOSED, event);
    }

    private onError(event: Event): void
    {
        this.dispatchConnectionEvent(SocketConnectionEvent.CONNECTION_ERROR, event);
    }

    private onMessage(event: MessageEvent): void
    {
        if(!event) return;

        //this.dispatchConnectionEvent(SocketConnectionEvent.CONNECTION_MESSAGE, event);

        const reader = new FileReader();

        reader.readAsArrayBuffer(event.data);

        reader.onloadend = () =>
        {
            this._dataBuffer = this.concatArrayBuffers(this._dataBuffer, (reader.result as ArrayBuffer));

            this.processReceivedData();
        };
    }

    private dispatchConnectionEvent(type: string, event: Event): void
    {
        this.dispatchEvent(new SocketConnectionEvent(type, this, event));
    }

    public authenticated(): void
    {
        this._isAuthenticated = true;
    }

    public send(...composers: IMessageComposer<unknown[]>[]): boolean
    {
        if(this.disposed || !composers) return false;

        composers = [...composers];

        if(this._isAuthenticated && !this._isReady)
        {
            if(!this._pendingClientMessages) this._pendingClientMessages = [];

            this._pendingClientMessages.push(...composers);

            return false;
        }

        for(const composer of composers)
        {
            if(!composer) continue;

            const header = this._messages.getComposerId(composer);

            if(header === -1)
            {
                NitroLogger.packets('Unknown Composer', composer.constructor.name);

                continue;
            }

            const message = composer.getMessageArray();
            const encoded = this._codec.encode(header, message);

            if(!encoded)
            {
                NitroLogger.packets('Encoding Failed', composer.constructor.name);

                continue;
            }

            NitroLogger.packets('OutgoingComposer', header, composer.constructor.name, message);

            this.write(encoded.getBuffer());
        }

        return true;
    }

    private write(buffer: ArrayBuffer): void
    {
        if(this._socket.readyState !== WebSocket.OPEN) return;

        this._socket.send(buffer);
    }

    public processReceivedData(): void
    {
        try
        {
            this.processData();
        }

        catch (err)
        {
            NitroLogger.error(err);
        }
    }

    private processData(): void
    {
        const wrappers = this.splitReceivedMessages();

        if(!wrappers || !wrappers.length) return;

        if(this._isAuthenticated && !this._isReady)
        {
            if(!this._pendingServerMessages) this._pendingServerMessages = [];

            this._pendingServerMessages.push(...wrappers);

            return;
        }

        this.processWrappers(...wrappers);
    }

    private processWrappers(...wrappers: IMessageDataWrapper[]): void
    {
        if(!wrappers || !wrappers.length) return;

        for(const wrapper of wrappers)
        {
            if(!wrapper) continue;

            const messages = this.getMessagesForWrapper(wrapper);

            if(!messages || !messages.length) continue;

            NitroLogger.packets('IncomingMessage', wrapper.header, messages[0].constructor.name, messages[0].parser);

            this.handleMessages(...messages);
        }
    }

    private splitReceivedMessages(): IMessageDataWrapper[]
    {
        if(!this._dataBuffer || !this._dataBuffer.byteLength) return null;

        return this._codec.decode(this);
    }

    private concatArrayBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer
    {
        const array = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

        array.set(new Uint8Array(buffer1), 0);
        array.set(new Uint8Array(buffer2), buffer1.byteLength);

        return array.buffer;
    }

    private getMessagesForWrapper(wrapper: IMessageDataWrapper): IMessageEvent[]
    {
        if(!wrapper) return null;

        const events = this._messages.getEvents(wrapper.header);

        if(!events || !events.length)
        {
            NitroLogger.packets('IncomingMessage', wrapper.header, 'UNREGISTERED', wrapper);

            return;
        }

        try
        {
            //@ts-ignore
            const parser = new events[0].parserClass();

            if(!parser || !parser.flush() || !parser.parse(wrapper)) return null;

            for(const event of events) (event.parser = parser);
        }

        catch (e)
        {
            NitroLogger.error('Error parsing message', e, events[0].constructor.name);

            return null;
        }

        return events;
    }

    private handleMessages(...messages: IMessageEvent[]): void
    {
        messages = [...messages];

        for(const message of messages)
        {
            if(!message) continue;

            message.connection = this;

            if(message.callBack) message.callBack(message);
        }
    }

    public registerMessages(configuration: IMessageConfiguration): void
    {
        if(!configuration) return;

        this._messages.registerMessages(configuration);
    }

    public addMessageEvent(event: IMessageEvent): void
    {
        if(!event || !this._messages) return;

        this._messages.registerMessageEvent(event);
    }

    public removeMessageEvent(event: IMessageEvent): void
    {
        if(!event || !this._messages) return;

        this._messages.removeMessageEvent(event);
    }

    public get isAuthenticated(): boolean
    {
        return this._isAuthenticated;
    }

    public get dataBuffer(): ArrayBuffer
    {
        return this._dataBuffer;
    }

    public set dataBuffer(buffer: ArrayBuffer)
    {
        this._dataBuffer = buffer;
    }
}
