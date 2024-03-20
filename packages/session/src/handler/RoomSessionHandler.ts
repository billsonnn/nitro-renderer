import { IConnection, IRoomHandlerListener } from '@nitrots/api';
import { DesktopViewEvent, FlatAccessDeniedMessageEvent, GoToFlatMessageComposer, RoomDoorbellAcceptedEvent, RoomEnterEvent, RoomReadyMessageEvent, YouAreSpectatorMessageEvent } from '@nitrots/communication';
import { GetEventDispatcher, RoomSessionDoorbellEvent, RoomSessionSpectatorModeEvent } from '@nitrots/events';
import { BaseHandler } from './BaseHandler';

export class RoomSessionHandler extends BaseHandler
{
    public static RS_CONNECTED: string = 'RS_CONNECTED';
    public static RS_READY: string = 'RS_READY';
    public static RS_DISCONNECTED: string = 'RS_DISCONNECTED';

    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomEnterEvent(this.onRoomEnterEvent.bind(this)));
        connection.addMessageEvent(new RoomReadyMessageEvent(this.onRoomReadyMessageEvent.bind(this)));
        connection.addMessageEvent(new DesktopViewEvent(this.onDesktopViewEvent.bind(this)));
        connection.addMessageEvent(new RoomDoorbellAcceptedEvent(this.onRoomDoorbellAcceptedEvent.bind(this)));
        connection.addMessageEvent(new FlatAccessDeniedMessageEvent(this.onRoomDoorbellRejectedEvent.bind(this)));
        connection.addMessageEvent(new YouAreSpectatorMessageEvent(this.onYouAreSpectatorMessageEvent.bind(this)));
    }

    private onRoomEnterEvent(event: RoomEnterEvent): void
    {
        if(!(event instanceof RoomEnterEvent)) return;

        if(this.listener) this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_CONNECTED);
    }

    private onRoomReadyMessageEvent(event: RoomReadyMessageEvent): void
    {
        if(!(event instanceof RoomReadyMessageEvent)) return;

        const fromRoomId = this.roomId;
        const toRoomId = event.getParser().roomId;

        if(this.listener)
        {
            this.listener.sessionReinitialize(fromRoomId, toRoomId);
            this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_READY);
        }
    }

    private onDesktopViewEvent(event: DesktopViewEvent): void
    {
        if(!(event instanceof DesktopViewEvent)) return;

        if(this.listener) this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_DISCONNECTED);
    }

    private onRoomDoorbellAcceptedEvent(event: RoomDoorbellAcceptedEvent): void
    {
        if(!(event instanceof RoomDoorbellAcceptedEvent) || !this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const username = parser.userName;

        if(!username || !username.length)
        {
            this.connection.send(new GoToFlatMessageComposer(this.roomId));
        }
        else
        {
            const session = this.listener.getSession(this.roomId);

            if(!session) return;

            GetEventDispatcher().dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.RSDE_ACCEPTED, session, username));
        }
    }

    private onRoomDoorbellRejectedEvent(event: FlatAccessDeniedMessageEvent): void
    {
        if(!(event instanceof FlatAccessDeniedMessageEvent) || !this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const username = parser.userName;

        if(!username || !username.length)
        {
            this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_DISCONNECTED);
        }
        else
        {
            const session = this.listener.getSession(this.roomId);

            if(!session) return;

            GetEventDispatcher().dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.RSDE_REJECTED, session, username));
        }
    }

    private onYouAreSpectatorMessageEvent(event: YouAreSpectatorMessageEvent): void
    {
        if(this.listener)
        {
            const session = this.listener.getSession(this.roomId);

            if(!session) return;

            session.isSpectator = true;

            GetEventDispatcher().dispatchEvent(new RoomSessionSpectatorModeEvent(RoomSessionSpectatorModeEvent.SPECTATOR_MODE, session));
        }
    }
}
