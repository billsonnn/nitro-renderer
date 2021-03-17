import { IConnection } from '../../../core/communication/connections/IConnection';
import { GenericErrorEvent } from '../../communication/messages/incoming/generic/GenericErrorEvent';
import { GenericErrorEnum } from '../enum/GenericErrorEnum';
import { RoomSessionErrorMessageEvent } from '../events/RoomSessionErrorMessageEvent';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';

export class GenericErrorHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        connection.addMessageEvent(new GenericErrorEvent(this.onRoomGenericError.bind(this)));
    }

    private onRoomGenericError(event: GenericErrorEvent): void
    {
        if(!(event instanceof GenericErrorEvent)) return;

        const parser = event.getParser();

        if(!parser) return;

        const roomSession = this.listener.getSession(this.roomId);

        if(!roomSession) return;

        let type: string = null;

        switch(parser.errorCode)
        {
            case GenericErrorEnum.KICKED_OUT_OF_ROOM:
                type = RoomSessionErrorMessageEvent.RSEME_KICKED;
                break;
            default:
                return;
        }

        if(!type || type.length == 0) return;

        this.listener.events.dispatchEvent(new RoomSessionErrorMessageEvent(type, roomSession));
    }
}
