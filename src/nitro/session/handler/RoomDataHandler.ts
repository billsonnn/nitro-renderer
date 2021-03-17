import { IConnection } from '../../../core/communication/connections/IConnection';
import { RoomInfoEvent } from '../../communication/messages/incoming/room/data/RoomInfoEvent';
import { RoomSessionEvent } from '../events/RoomSessionEvent';
import { RoomSessionPropertyUpdateEvent } from '../events/RoomSessionPropertyUpdateEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomDataHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomInfoEvent(this.onRoomInfoEvent.bind(this)));
    }

    private onRoomInfoEvent(event: RoomInfoEvent): void
    {
        if(!(event instanceof RoomInfoEvent)) return;

        const parser = event.getParser();

        if(!parser) return;

        if(parser.roomForward) return;

        const roomSession = this.listener.getSession(this.roomId);

        if(!roomSession) return;

        const roomData = parser.data;

        roomSession.tradeMode           = roomData.tradeMode;
        roomSession.isGuildRoom         = (roomData.habboGroupId !== 0);
        roomSession.doorMode            = roomData.doorMode;
        roomSession.allowPets           = roomData.allowPets;
        roomSession.moderationSettings  = parser.moderation;

        this.listener.events.dispatchEvent(new RoomSessionPropertyUpdateEvent(RoomSessionPropertyUpdateEvent.RSDUE_ALLOW_PETS, roomSession));
        this.listener.events.dispatchEvent(new RoomSessionEvent(RoomSessionEvent.ROOM_DATA, roomSession));
    }
}