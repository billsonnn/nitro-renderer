import { IConnection } from '../../../core/communication/connections/IConnection';
import { IRoomHandlerListener } from '../IRoomHandlerListener';
import { BaseHandler } from './BaseHandler';
import { FurnitureGiftOpenedEvent } from '../../communication/messages/incoming/inventory/furni/gifts/FurnitureGiftOpenedEvent';
import { RoomSessionPresentEvent } from '../events/RoomSessionPresentEvent';

export class RoomPresentHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        if(!connection) return;

        connection.addMessageEvent(new FurnitureGiftOpenedEvent(this.onFurnitureGiftOpenedEvent.bind(this)));
    }

    private onFurnitureGiftOpenedEvent(event: FurnitureGiftOpenedEvent): void
    {
        if(!event) return;

        const parser = event.getParser();

        if(!parser) return;

        const session = this.listener.getSession(this.roomId);

        if(!session) return;

        if(this.listener && this.listener.events) this.listener.events.dispatchEvent(
            new RoomSessionPresentEvent(RoomSessionPresentEvent.RSPE_PRESENT_OPENED, session, parser.classId, parser._Str_2887,
                parser.productCode, parser.placedItemId, parser.placedItemType, parser._Str_4057, parser.petFigureString));

    }

}
