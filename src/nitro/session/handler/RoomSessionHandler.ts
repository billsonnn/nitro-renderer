import { IConnection } from '../../../core/communication/connections/IConnection';
import { DesktopViewEvent } from '../../communication/messages/incoming/desktop/DesktopViewEvent';
import { RoomDoorbellAcceptedEvent } from '../../communication/messages/incoming/room/access/doorbell/RoomDoorbellAcceptedEvent';
import { RoomDoorbellRejectedEvent } from '../../communication/messages/incoming/room/access/doorbell/RoomDoorbellRejectedEvent';
import { RoomEnterEvent } from '../../communication/messages/incoming/room/access/RoomEnterEvent';
import { RoomModelNameEvent } from '../../communication/messages/incoming/room/mapping/RoomModelNameEvent';
import { RoomSessionDoorbellEvent } from '../events/RoomSessionDoorbellEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomSessionHandler extends BaseHandler
{
    public static RS_CONNECTED: string      = 'RS_CONNECTED';
    public static RS_READY: string          = 'RS_READY';
    public static RS_DISCONNECTED: string   = 'RS_DISCONNECTED';

    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomEnterEvent(this.onRoomEnterEvent.bind(this)));
        connection.addMessageEvent(new RoomModelNameEvent(this.onRoomModelNameEvent.bind(this)));
        connection.addMessageEvent(new DesktopViewEvent(this.onDesktopViewEvent.bind(this)));
        connection.addMessageEvent(new RoomDoorbellAcceptedEvent(this.onRoomDoorbellAcceptedEvent.bind(this)));
        connection.addMessageEvent(new RoomDoorbellRejectedEvent(this.onRoomDoorbellRejectedEvent.bind(this)));
    }

    private onRoomEnterEvent(event: RoomEnterEvent): void
    {
        if(!(event instanceof RoomEnterEvent)) return;

        if(this.listener) this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_CONNECTED);
    }

    private onRoomModelNameEvent(event: RoomModelNameEvent): void
    {
        if(!(event instanceof RoomModelNameEvent)) return;

        const fromRoomId    = this.roomId;
        const toRoomId      = event.getParser().roomId;

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
            //this.connection.send();
        }
        else
        {
            if(this.listener.events)
            {
                const session = this.listener.getSession(this.roomId);

                if(!session) return;

                this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.RSDE_ACCEPTED, session, username));
            }
        }
    }

    private onRoomDoorbellRejectedEvent(event: RoomDoorbellRejectedEvent): void
    {
        if(!(event instanceof RoomDoorbellRejectedEvent) || !this.listener) return;

        const parser = event.getParser();

        if(!parser) return;

        const username = parser.userName;

        if(!username || !username.length)
        {
            this.listener.sessionUpdate(this.roomId, RoomSessionHandler.RS_DISCONNECTED);
        }
        else
        {
            if(this.listener.events)
            {
                const session = this.listener.getSession(this.roomId);

                if(!session) return;

                this.listener.events.dispatchEvent(new RoomSessionDoorbellEvent(RoomSessionDoorbellEvent.RSDE_REJECTED, session, username));
            }
        }
    }
}