import { IConnection } from '../../../core/communication/connections/IConnection';
import { RoomRightsClearEvent } from '../../communication/messages/incoming/room/access/rights/RoomRightsClearEvent';
import { RoomRightsEvent } from '../../communication/messages/incoming/room/access/rights/RoomRightsEvent';
import { RoomRightsOwnerEvent } from '../../communication/messages/incoming/room/access/rights/RoomRightsOwnerEvent';
import { RoomControllerLevel } from '../enum/RoomControllerLevel';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class RoomPermissionsHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new RoomRightsEvent(this.onRoomRightsEvent.bind(this)));
        connection.addMessageEvent(new RoomRightsClearEvent(this.onRoomRightsClearEvent.bind(this)));
        connection.addMessageEvent(new RoomRightsOwnerEvent(this.onRoomRightsOwnerEvent.bind(this)));
    }

    private onRoomRightsEvent(event: RoomRightsEvent): void
    {
        if(!(event instanceof RoomRightsEvent)) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.setControllerLevel(event.getParser().controllerLevel);
    }

    private onRoomRightsClearEvent(event: RoomRightsClearEvent): void
    {
        if(!(event instanceof RoomRightsClearEvent)) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.setControllerLevel(RoomControllerLevel.NONE);
    }

    private onRoomRightsOwnerEvent(event: RoomRightsOwnerEvent): void
    {
        if(!(event instanceof RoomRightsOwnerEvent)) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        session.setRoomOwner();
    }
}